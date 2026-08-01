-- ============================================================================
-- OPTIONAL performance optimization: put the user's role into the JWT so the
-- admin layout can authorize with ZERO database queries (it already verifies
-- the token locally via getClaims() — this removes the fallback role lookup).
--
-- The app works WITHOUT this: utils/admin/session.ts falls back to a single
-- `users.role` query when the `user_role` claim is absent. Applying this hook
-- turns that fallback off, making every admin page's auth gate ~free.
--
-- HOW TO APPLY (you must do this in your own Supabase project):
--   1. Run this whole file in the Supabase SQL Editor.
--   2. Dashboard -> Authentication -> Hooks (Auth Hooks)
--        -> "Custom Access Token" -> select public.custom_access_token_hook
--   3. Sign out and back in so a fresh JWT is issued with the claim.
--
-- NOTE: the JWT already has a reserved `role` claim (= "authenticated"), so we
-- use a DISTINCT claim name `user_role` for the app role. The app reads
-- `user_role` (see utils/admin/session.ts).
-- ============================================================================

create or replace function public.custom_access_token_hook(event jsonb)
returns jsonb
language plpgsql
stable
as $$
declare
  claims    jsonb;
  app_role  text;
begin
  select role into app_role from public.users where id = (event->>'user_id')::uuid;

  claims := event->'claims';
  if app_role is not null then
    claims := jsonb_set(claims, '{user_role}', to_jsonb(app_role));
  end if;

  event := jsonb_set(event, '{claims}', claims);
  return event;
end;
$$;

-- The Auth server runs the hook as role `supabase_auth_admin`; grant it the
-- minimum needed and keep the function off the API for everyone else.
grant usage on schema public to supabase_auth_admin;
grant execute on function public.custom_access_token_hook to supabase_auth_admin;
revoke execute on function public.custom_access_token_hook from authenticated, anon, public;
grant select on table public.users to supabase_auth_admin;

-- Allow the auth admin to read the users table under RLS.
do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'users'
      and policyname = 'Allow auth admin to read user roles'
  ) then
    create policy "Allow auth admin to read user roles"
      on public.users as permissive for select to supabase_auth_admin using (true);
  end if;
end $$;
