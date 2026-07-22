import Image from "next/image";
import Header from "@/components/client/layout/Header";
import Footer from "@/components/server/layout/Footer";

export const metadata = {
    title: "Exchange Policy | Ziea Clothing",
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
                            Exchange Policy
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
                                <span className="font-jost not-italic text-2xl">1.</span> Exchange Policy
                            </h2>

                            <p>
                                At Ziea, we currently support <strong>exchange only</strong>. We do not
                                offer returns, refunds, or cancellations once an order has been
                                delivered.
                            </p>

                        </section>

                        {/* 2 */}

                        <section>

                            <h2 className="cormorant text-4xl italic text-primary-dark mb-5">
                                <span className="font-jost not-italic text-2xl">2.</span> Exchange Eligibility
                            </h2>

                            <p className="mb-5">
                                To qualify for an exchange:
                            </p>

                            <ul className="list-disc pl-6 space-y-2">

                                <li>Products must be requested for exchange within <strong>7 days</strong> of delivery.</li>

                                <li>The product must be unworn and unused.</li>

                                <li>Original tags must remain attached.</li>

                                <li>The item must be returned in its original packaging.</li>

                                <li>A valid receipt or proof of purchase is required.</li>

                            </ul>

                        </section>

                        {/* 3 */}

                        <section>

                            <h2 className="cormorant text-4xl italic text-primary-dark mb-5">
                                <span className="font-jost not-italic text-2xl">3.</span> Size <span className="font-jost not-italic text-2xl">&</span> Colour Exchanges
                            </h2>

                            <p className="mb-5">
                                Need another size or colour?
                            </p>

                            <ul className="list-disc pl-6 space-y-2">

                                <li>We offer free exchanges for the same product.</li>

                                <li>Exchanges are subject to stock availability.</li>

                                <li>Only the same product can be exchanged.</li>

                                <li>One exchange is permitted per order.</li>

                            </ul>

                        </section>

                        {/* 4 */}

                        <section>

                            <h2 className="cormorant text-4xl italic text-primary-dark mb-5">
                                <span className="font-jost not-italic text-2xl">4.</span> How to Request an Exchange
                            </h2>

                            <p className="mb-5">
                                To request an exchange, email us at
                                <strong> feedback@ziea.in </strong>
                                with your order number.
                            </p>

                            <p className="mb-5">
                                Please do not send products back without prior approval, as they will
                                not be accepted.
                            </p>

                            <p>
                                Once your request has been approved, we will provide:
                            </p>

                            <ul className="list-disc pl-6 mt-4 space-y-2">

                                <li>A return shipping label.</li>

                                <li>Instructions on how and where to send the package.</li>

                            </ul>

                        </section>

                        {/* 5 */}

                        <section>

                            <h2 className="cormorant text-4xl italic text-primary-dark mb-5">
                                <span className="font-jost not-italic text-2xl">5.</span> Return Address
                            </h2>

                            <div className="rounded-2xl bg-primary/5 border border-primary/10 p-6">

                                <p className="font-semibold text-lg">
                                    Ziea Clothing
                                </p>

                                <p>
                                    Startups Valley TBI
                                </p>

                                <p>
                                    Amal Jyothi College of Engineering
                                </p>

                                <p>
                                    Koovappally, Kanjirappally
                                </p>

                                <p>
                                    India – 686518
                                </p>

                            </div>

                        </section>

                        {/* 6 */}

                        <section>

                            <h2 className="cormorant text-4xl italic text-primary-dark mb-5">
                                <span className="font-jost not-italic text-2xl">6.</span> Damages <span className="font-jost not-italic text-2xl">&</span> Issues
                            </h2>

                            <p className="mb-5">
                                Please inspect your order immediately upon delivery.
                            </p>

                            <ul className="list-disc pl-6 space-y-2">

                                <li>Contact us immediately if the item is damaged, defective or incorrect.</li>

                                <li>
                                    A complete unboxing video recorded within
                                    <strong> 24 hours </strong>
                                    of delivery is mandatory for damaged or defective items.
                                </li>

                                <li>
                                    This enables us to evaluate the issue quickly and provide an
                                    appropriate resolution.
                                </li>

                            </ul>

                        </section>

                        {/* 7 */}

                        <section>

                            <h2 className="cormorant text-4xl italic text-primary-dark mb-5">
                                <span className="font-jost not-italic text-2xl">7.</span> Exceptions
                            </h2>

                            <p className="mb-5">
                                The following products are not eligible for exchange:
                            </p>

                            <ul className="list-disc pl-6 space-y-2">

                                <li>Custom-made products.</li>

                                <li>Personalized items.</li>

                                <li>Items without original tags.</li>

                                <li>Items that have been worn.</li>

                                <li>Items that have been washed.</li>

                                <li>Items that have been altered.</li>

                            </ul>

                        </section>

                        {/* Contact */}

                        <section className="rounded-3xl bg-primary/10 border border-primary/10 p-8 md:p-10">

                            <h2 className="cormorant text-4xl italic text-primary-dark mb-6">
                                <span className="font-jost not-italic text-2xl">8.</span> Contact Us
                            </h2>

                            <p className="mb-8">
                                For exchange-related questions or assistance, please contact us.
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
                                        href="mailto:feedback@ziea.in"
                                        className="text-secondary font-semibold hover:underline"
                                    >
                                        feedback@ziea.in
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