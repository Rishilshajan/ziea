import Image from "next/image";
import Header from "@/components/client/layout/Header";
import Footer from "@/components/server/layout/Footer";

export const metadata = {
    title: "Privacy Policy | Ziea Clothing",
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
                            Privacy Policy
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

                        <section>
                            <h2 className="cormorant text-4xl italic text-primary-dark mb-5">
                                <span className="font-jost not-italic text-2xl">1.</span> Introduction
                            </h2>

                            <p>
                                At <strong>ZIEA</strong> ("we," "our," or "us"), we are committed
                                to protecting your privacy. This Privacy Policy explains how we
                                collect, use, disclose, and safeguard your information whenever
                                you visit our website or purchase our products.
                            </p>
                        </section>

                        <section>
                            <h2 className="cormorant text-4xl italic text-primary-dark mb-5">
                                <span className="font-jost not-italic text-2xl">2.</span> Information We Collect
                            </h2>

                            <p className="mb-5">
                                We collect information that you voluntarily provide to us,
                                including:
                            </p>

                            <ul className="list-disc pl-6 space-y-2">
                                <li>Name</li>
                                <li>Email address</li>
                                <li>Phone number</li>
                                <li>Billing and shipping addresses</li>
                                <li>
                                    Payment information (processed securely by our payment
                                    partners)
                                </li>
                                <li>Order history and preferences</li>
                                <li>Communications with our customer support team</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="cormorant text-4xl italic text-primary-dark mb-5">
                                <span className="font-jost not-italic text-2xl">3.</span> How We Use Your Information
                            </h2>

                            <p className="mb-5">
                                We use your information to:
                            </p>

                            <ul className="list-disc pl-6 space-y-2">
                                <li>Process and fulfill your orders</li>
                                <li>Send order confirmations and shipping updates</li>
                                <li>Respond to your questions and requests</li>
                                <li>Send marketing communications with your consent</li>
                                <li>Improve our website and services</li>
                                <li>Prevent fraud and enhance security</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="cormorant text-4xl italic text-primary-dark mb-5">
                                <span className="font-jost not-italic text-2xl">4.</span> Information Sharing
                            </h2>

                            <p>
                                We do not sell, trade, or rent your personal information to
                                third parties. We may share your information with trusted
                                service providers who help us operate our website, conduct our
                                business, process payments, deliver orders, or support our
                                customers, provided they agree to keep your information
                                confidential.
                            </p>
                        </section>

                        <section>
                            <h2 className="cormorant text-4xl italic text-primary-dark mb-5">
                                <span className="font-jost not-italic text-2xl">5.</span> Data Security
                            </h2>

                            <p>
                                We implement appropriate security measures to protect your
                                personal information. Payment transactions are encrypted using
                                SSL technology. While we take reasonable precautions, no method
                                of transmission over the Internet is completely secure, and we
                                cannot guarantee absolute security.
                            </p>
                        </section>

                        <section>
                            <h2 className="cormorant text-4xl italic text-primary-dark mb-5">
                                <span className="font-jost not-italic text-2xl">6.</span> Cookies
                            </h2>

                            <p>
                                We use cookies and similar technologies to improve your browsing
                                experience, analyze website traffic, and understand how visitors
                                use our website. You may disable cookies through your browser
                                settings at any time.
                            </p>
                        </section>

                        <section>
                            <h2 className="cormorant text-4xl italic text-primary-dark mb-5">
                                <span className="font-jost not-italic text-2xl">7.</span> Your Rights
                            </h2>

                            <p className="mb-5">
                                You have the right to:
                            </p>

                            <ul className="list-disc pl-6 space-y-2">
                                <li>Access the personal information we hold about you</li>
                                <li>Request correction of inaccurate information</li>
                                <li>Request deletion of your information</li>
                                <li>Opt out of marketing communications</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="cormorant text-4xl italic text-primary-dark mb-5">
                                <span className="font-jost not-italic text-2xl">8.</span> Children's Privacy
                            </h2>

                            <p>
                                Our website is not intended for children under 13 years of age.
                                We do not knowingly collect personal information from children
                                under the age of 13.
                            </p>
                        </section>

                        <section>
                            <h2 className="cormorant text-4xl italic text-primary-dark mb-5">
                                <span className="font-jost not-italic text-2xl">9.</span> Changes to This Policy
                            </h2>

                            <p>
                                We may update this Privacy Policy from time to time. Any changes
                                will be posted on this page together with the updated revision
                                date.
                            </p>
                        </section>

                        {/* Contact Card */}
                        <section className="rounded-3xl bg-primary/10 border border-primary/10 p-8 md:p-10">

                            <h2 className="cormorant text-4xl italic text-primary-dark mb-6">
                                <span className="font-jost not-italic text-2xl">10.</span> Contact Us
                            </h2>

                            <p className="mb-8">
                                If you have any questions regarding this Privacy Policy, please
                                contact us.
                            </p>

                            <div className="space-y-5">

                                <div>
                                    <p className="font-semibold text-xl">
                                        Ziea Clothing
                                    </p>
                                </div>

                                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-lg">
                                    <span className="font-semibold text-primary-dark">Email:</span>
                                    <a
                                        href="mailto:contact@ziea.in"
                                        className="text-secondary font-semibold hover:underline"
                                    >
                                        contact@ziea.in
                                    </a>
                                </div>

                                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-lg pt-2">
                                    <span className="font-semibold text-primary-dark">Phone:</span>
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