"use client";

import { useActionState, useEffect, useState } from "react";
import { subscribeNewsletter } from "@/app/actions/newsletter";
import Toast from "@/components/ui/Toast";

const initialState = {
    success: false,
    message: "",
};

export default function NewsletterForm() {
    const [state, formAction, pending] = useActionState(
        subscribeNewsletter,
        initialState
    );

    const [showToast, setShowToast] = useState(false);

    useEffect(() => {
        if (!state.message) return;

        setShowToast(true);

        const timer = setTimeout(() => {
            setShowToast(false);
        }, 3000);

        return () => clearTimeout(timer);
    }, [state]);

    return (
        <>
            <Toast
                show={showToast}
                message={state.message}
                error={!state.success}
            />

            <form action={formAction} className="w-full space-y-4">
                <input
                    type="email"
                    name="email"
                    placeholder="Email address"
                    required
                    className="w-full rounded-xl border border-white/25 bg-transparent px-5 py-4 text-base text-white placeholder:text-white/45 outline-none transition-colors focus:border-white/60"
                />

                <button
                    type="submit"
                    disabled={pending}
                    className="w-full rounded-full bg-[#99AD75] py-4 text-base font-semibold uppercase tracking-wider text-white transition-colors hover:bg-[#869965] disabled:opacity-60"
                >
                    {pending ? "Joining..." : "Join"}
                </button>
            </form>
        </>
    );
}
