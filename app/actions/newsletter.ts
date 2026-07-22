"use server";

import { createClient } from "@/utils/supabase/server";

export async function subscribeNewsletter(
    prevState: any,
    formData: FormData
) {
    const email = formData.get("email")?.toString();

    if (!email) {
        return { success: false, message: "Email is required" };
    }

    try {
        const supabase = await createClient();

        const { error } = await supabase
            .from("newsletter")
            .insert([{ email }]);

        if (error) {
            if (error.code === '23505') { // Unique violation
                return { success: false, message: "You are already subscribed!" };
            }
            console.error("Newsletter subscription error:", error);
            return { success: false, message: "Failed to subscribe. Please try again." };
        }

        return { success: true, message: "Successfully subscribed!" };
    } catch (err) {
        console.error("Unexpected error during newsletter subscription:", err);
        return { success: false, message: "An unexpected error occurred" };
    }
}