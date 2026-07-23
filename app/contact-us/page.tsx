import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

import Header from "../../components/client/layout/Header";
import Footer from "../../components/server/layout/Footer";
import ContactForm from "../../components/client/contact/ContactForm";
import ContactInfo from "../../components/server/contact/ContactInfo";

export const metadata: Metadata = {
  title: "Connect With Us | ZIEA",
  description:
    "Reach out for inquiries, collaborations, or simply to share your thoughts on natural luxury.",
};

export default function ContactPage() {
  return (
    <>
      <Header />

      <main className="bg-background min-h-screen mt-16 md:mt-20">

        <div className="w-full px-margin-mobile xl:px-8 pt-4 md:pt-6 pb-16 md:pb-24">

          {/* Breadcrumb */}
          <nav className="flex items-center text-[13px] md:text-sm text-muted mb-6 md:mb-8">
            <Link
              href="/"
              className="transition-colors hover:text-primary"
            >
              Home
            </Link>

            <span className="mx-2 text-muted/40">/</span>

            <span className="text-text">
              Contact Us
            </span>
          </nav>

          {/* Heading */}
          <div className="mx-auto mb-10 md:mb-14 max-w-3xl text-center">

            <h1 className="cormorant text-5xl md:text-6xl italic text-primary-dark">
              Connect With Us
            </h1>

            <p className="mt-5 font-jost text-base md:text-lg leading-8 text-muted">
              We invite you to reach out for inquiries, collaborations,
              partnerships, or simply to share your thoughts on natural luxury.
            </p>

          </div>

          {/* 
            Contact Layout — items-start so each column sizes to its content
            No h-full, no items-stretch — natural height like AuthForm
          */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 xl:gap-10 items-start">

            {/* LEFT COLUMN — Form + Image stacked naturally */}
            <div className="xl:col-span-7 flex flex-col gap-8">

              <ContactForm />

            </div>

            {/* RIGHT COLUMN — Info Cards */}
            <div className="xl:col-span-5">
              <ContactInfo />
            </div>

          </div>

        </div>

      </main>

      <Footer />
    </>
  );
}