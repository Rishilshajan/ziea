import React from "react";
import Link from "next/link";
import {
  MdOutlineLocationOn,
  MdOutlineContactSupport,
  MdOutlineMail,
  MdOutlineCall,
  MdOutlineSchedule,
  MdOutlineArrowOutward,
} from "react-icons/md";

export default function ContactInfo() {
  return (
    /* Added h-full here */
    <div className="md:col-span-5 flex flex-col gap-6 h-full">

      {/* Visit Studio — Added flex-1 */}
      <div className="rounded-2xl md:rounded-3xl bg-surface border border-border shadow-[0px_8px_30px_rgba(44,56,41,0.06)] p-5 sm:p-6 md:p-8 flex-1">

        <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6">
          <MdOutlineLocationOn size={26} />
        </div>

        <h3 className="cormorant text-3xl md:text-[34px] italic text-primary-dark mb-5 md:mb-6">
          Visit Our Studio
        </h3>

        <div className="space-y-1 text-base md:text-[17px] leading-7 md:leading-8 text-muted">
          <p className="font-semibold text-text">Ziea Clothing</p>
          <p>Startups Valley TBI</p>
          <p>Amal Jyothi College of Engineering</p>
          <p>Koovappally, Kanjirappally</p>
          <p>Kerala 686518</p>
        </div>

        <Link
          href="https://maps.google.com"
          target="_blank"
          className="inline-flex items-center gap-2 mt-8 text-secondary font-medium hover:gap-3 transition-all"
        >
          View on Google Maps
          <MdOutlineArrowOutward />
        </Link>

      </div>

      {/* Reach Out — Added flex-1 */}
      <div className="rounded-2xl md:rounded-3xl bg-surface border border-border shadow-[0px_8px_30px_rgba(44,56,41,0.06)] p-5 sm:p-6 md:p-8 flex-1">

        <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6">
          <MdOutlineContactSupport size={24} />
        </div>

        <h3 className="cormorant text-3xl md:text-[34px] italic text-primary-dark mb-5 md:mb-6">
          Reach Out
        </h3>

        <div className="space-y-6">

          <a
            href="mailto:contact@ziea.in"
            className="flex items-start gap-4 group"
          >
            <MdOutlineMail className="text-xl text-primary mt-0.5 shrink-0" />

            <div>
              <p className="font-jost text-base font-medium uppercase tracking-widest text-muted mb-1">
                Email
              </p>

              <p className="font-jost text-base md:text-lg text-text group-hover:text-primary transition-colors">
                contact@ziea.in
              </p>
            </div>
          </a>

          <a
            href="tel:+918301027765"
            className="flex items-start gap-4 group"
          >
            <MdOutlineCall className="text-xl text-primary mt-0.5 shrink-0" />

            <div>
              <p className="font-jost text-base font-medium uppercase tracking-widest text-muted mb-1">
                Phone
              </p>

              <p className="font-jost text-base md:text-lg text-text group-hover:text-primary transition-colors">
                +91 8301 027 765
              </p>
            </div>
          </a>

          <div className="flex items-start gap-4">

            <MdOutlineSchedule className="text-xl text-primary mt-0.5 shrink-0" />

            <div>
              <p className="font-jost text-base font-medium uppercase tracking-widest text-muted mb-1">
                Support Hours
              </p>

              <p className="font-jost text-base md:text-lg text-text">
                Monday – Saturday
              </p>

              <p className="font-jost text-base text-muted mt-0.5">
                9:00 AM – 6:00 PM IST
              </p>
            </div>

          </div>

        </div>

        <div className="mt-8 rounded-2xl bg-background/70 border border-border p-5">

          <p className="font-jost text-base font-medium uppercase tracking-widest text-muted mb-2">
            Response Time
          </p>

          <p className="font-jost text-base text-text leading-7">
            We usually respond to all enquiries within
            <span className="font-semibold"> 24 business hours.</span>
          </p>

        </div>

      </div>

    </div>
  );
}