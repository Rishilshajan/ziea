import AdminNavigation from "@/components/client/admin/AdminNavigation";
import { getAdminProfile } from "@/utils/admin/session";

/**
 * Server wrapper that resolves the admin profile for the nav. Rendered inside a
 * Suspense boundary in the admin layout so the profile query streams in without
 * blocking the page content from rendering.
 */
export default async function AdminNavServer({ userId }: { userId: string }) {
  const profile = await getAdminProfile();
  const navProfile = profile
    ? {
        first_name: profile.firstName,
        last_name: profile.lastName,
        email: profile.email,
        role: profile.role,
      }
    : null;

  return <AdminNavigation initialProfile={navProfile} initialUserId={userId} />;
}
