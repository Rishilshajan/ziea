import Image from "next/image";
import Header from "@/components/client/layout/Header";
import Footer from "@/components/server/layout/Footer";

export const metadata = {
    title: "Terms of Service | Ziea Clothing",
};

export default function PrivacyPolicyPage() {
    return (
        <>
            <Header />

            <main className="mt-16 md:mt-20 bg-background min-h-screen">

                <div className="max-w-4xl mx-auto px-margin-mobile md:px-8 pt-section-gap pb-16 md:pb-24">


                    {/* Heading */}
                    <div className="text-center mb-12">

                        <h1 className="cormorant text-5xl md:text-6xl italic text-primary-dark py-6">
                            Terms of Service
                        </h1>

                        <p className="mt-4 text-muted">
                            Last Updated:
                            <span className="font-semibold text-secondary ml-2">
                                01 August 2026
                            </span>
                        </p>

                    </div>

                    {/* Content */}
                    <article className="space-y-12 text-text leading-8">

                        {/* 1 */}
                        <section>

                            <h2 className="cormorant text-4xl italic text-primary-dark mb-5">
                                <span className="font-jost not-italic text-2xl">1.</span> Acceptance of Terms
                            </h2>

                            <p>
                                By accessing, browsing, or purchasing products through the ZIEA website,
                                you agree to be bound by these Terms of Service. If you do not agree with
                                these Terms, you should not use this website, as continued use
                                constitutes your acceptance of these Terms.
                            </p>

                        </section>

                        {/* 2 */}
                        <section>

                            <h2 className="cormorant text-4xl italic text-primary-dark mb-5">
                                <span className="font-jost not-italic text-2xl">2.</span> Use of Website
                            </h2>

                            <p className="mb-5">
                                You agree to use this website only for lawful purposes. You may not:
                            </p>

                            <ul className="list-disc pl-6 space-y-2">
                                <li>Use the website in violation of any applicable laws or regulations.</li>
                                <li>Attempt to interfere with the proper functioning of the website.</li>
                                <li>Use automated systems to access the website without permission.</li>
                                <li>Impersonate another person or organization.</li>
                                <li>Collect personal information about other users without consent.</li>
                            </ul>

                        </section>

                        {/* 3 */}
                        <section>

                            <h2 className="cormorant text-4xl italic text-primary-dark mb-5">
                                <span className="font-jost not-italic text-2xl">3.</span> Products & Pricing
                            </h2>

                            <p>
                                All prices displayed on our website are in Indian Rupees (₹) and include
                                applicable taxes unless otherwise stated. Prices may change without prior
                                notice. If a pricing error occurs, ZIEA reserves the right to cancel any
                                order placed using the incorrect price.
                            </p>

                        </section>

                        {/* 4 */}
                        <section>

                            <h2 className="cormorant text-4xl italic text-primary-dark mb-5">
                                <span className="font-jost not-italic text-2xl">4.</span> Orders & Payment
                            </h2>

                            <p>
                                Placing an order constitutes an offer to purchase products. ZIEA reserves
                                the right to accept or reject any order at its discretion. Orders are
                                processed only after successful payment. We accept payment methods shown
                                during checkout.
                            </p>

                        </section>

                        {/* 5 */}
                        <section>

                            <h2 className="cormorant text-4xl italic text-primary-dark mb-5">
                                <span className="font-jost not-italic text-2xl">5.</span> Shipping & Delivery
                            </h2>

                            <p>
                                Shipping costs and delivery times depend on your location and selected
                                shipping method. While we strive to meet estimated delivery dates, they
                                cannot be guaranteed. ZIEA is not responsible for delays caused by
                                shipping carriers or customs authorities.
                            </p>

                        </section>

                        {/* 6 */}
                        <section>

                            <h2 className="cormorant text-4xl italic text-primary-dark mb-5">
                                <span className="font-jost not-italic text-2xl">6.</span> Returns & Refunds
                            </h2>

                            <p>
                                Our Returns & Refund Policy is available on our Returns page. By placing
                                an order, you agree to the conditions outlined in that policy. Returned
                                items must be in their original condition and within the specified return
                                period.
                            </p>

                        </section>

                        {/* 7 */}
                        <section>

                            <h2 className="cormorant text-4xl italic text-primary-dark mb-5">
                                <span className="font-jost not-italic text-2xl">7.</span> Intellectual Property
                            </h2>

                            <p>
                                All content on this website—including text, graphics, logos, product
                                images, designs, and software—is the intellectual property of ZIEA and
                                is protected by applicable copyright and trademark laws. No material may
                                be reproduced or distributed without our written permission.
                            </p>

                        </section>

                        {/* 8 */}
                        <section>

                            <h2 className="cormorant text-4xl italic text-primary-dark mb-5">
                                <span className="font-jost not-italic text-2xl">8.</span> User Accounts
                            </h2>

                            <p>
                                If you create an account with ZIEA, you are responsible for maintaining
                                the confidentiality of your login credentials and for all activities
                                carried out through your account. Please notify us immediately if you
                                suspect unauthorized access.
                            </p>

                        </section>

                        {/* 9 */}
                        <section>

                            <h2 className="cormorant text-4xl italic text-primary-dark mb-5">
                                <span className="font-jost not-italic text-2xl">9.</span> Limitation of Liability
                            </h2>

                            <p>
                                ZIEA shall not be liable for any indirect, incidental, special,
                                consequential, or punitive damages arising from your use of this website
                                or products purchased through it. Our liability shall never exceed the
                                amount paid for the product giving rise to the claim.
                            </p>

                        </section>

                        {/* 10 */}
                        <section>

                            <h2 className="cormorant text-4xl italic text-primary-dark mb-5">
                                <span className="font-jost not-italic text-2xl">10.</span> Indemnification
                            </h2>

                            <p>
                                You agree to indemnify and hold harmless ZIEA, its directors, employees,
                                partners, and affiliates against any claims, damages, liabilities,
                                expenses, or losses arising from your use of this website or violation of
                                these Terms.
                            </p>

                        </section>

                        {/* 11 */}
                        <section>

                            <h2 className="cormorant text-4xl italic text-primary-dark mb-5">
                                <span className="font-jost not-italic text-2xl">11.</span> Governing Law
                            </h2>

                            <p>
                                These Terms of Service shall be governed by and interpreted in accordance
                                with the laws of India.
                            </p>

                        </section>

                        {/* 12 */}
                        <section>

                            <h2 className="cormorant text-4xl italic text-primary-dark mb-5">
                                <span className="font-jost not-italic text-2xl">12.</span> Changes to These Terms
                            </h2>

                            <p>
                                ZIEA reserves the right to update or modify these Terms of Service at any
                                time. Changes become effective immediately upon publication on this page.
                                Continued use of the website after such changes constitutes acceptance of
                                the updated Terms.
                            </p>

                        </section>

                        {/* Contact */}
                        <section className="rounded-3xl bg-primary/10 border border-primary/10 p-8 md:p-10">

                            <h2 className="cormorant text-4xl italic text-primary-dark mb-6">
                                <span className="font-jost not-italic text-2xl">13.</span> Contact Information
                            </h2>

                            <p className="mb-8">
                                If you have any questions regarding these Terms of Service, please
                                contact us.
                            </p>

                            <div className="space-y-5">

                                <p className="font-semibold text-xl">
                                    Ziea Clothing
                                </p>

                                <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-lg">

                                    <span className="font-semibold text-primary-dark">
                                        Email:
                                    </span>

                                    <a
                                        href="mailto:contact@ziea.in"
                                        className="text-secondary font-semibold hover:underline"
                                    >
                                        contact@ziea.in
                                    </a>

                                </div>

                                <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-lg">

                                    <span className="font-semibold text-primary-dark">
                                        Phone:
                                    </span>

                                    <a
                                        href="tel:+918301027765"
                                        className="text-secondary font-semibold hover:underline"
                                    >
                                        +91 8301 027 765
                                    </a>

                                </div>

                            </div>

                        </section>

                    </article>
                </div>

            </main>

            <Footer />
        </>
    );
}