import Link from "next/link";
import Image from "next/image";
import NewsletterForm from "@/components/client/home/NewsletterForm";
import { createClient } from "@/utils/supabase/server";

export default async function Footer() {
  const supabase = await createClient();

  const { data: categories } = await supabase
    .from("categories")
    .select("id, name")
    .order("created_at", { ascending: true });

  return (
    <footer className="bg-[#2C3829] text-white">
      <div className="px-margin-mobile xl:px-8 pt-10 pb-8 lg:pt-16 lg:pb-12">

        {/* Top */}
        <div className="flex flex-col lg:flex-row justify-between">

          {/* Left Column */}
          <div className="lg:w-[34%] flex flex-col items-start">

            {/* Logo */}
            <div className="w-full -mt-8 -mb-4 lg:-mt-24 lg:-mb-4">
              <Image
                src="/Ziea_Logo.png"
                alt="ZIEA"
                width={240}
                height={100}
                priority
                className="-ml-10 w-[170px] md:w-[200px] h-auto brightness-0 invert"
              />
            </div>

            <NewsletterForm />

          </div>

          {/* Right Column */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-10 lg:w-[60%] mt-8 lg:mt-0">

            {/* Shop */}
            <div className="space-y-4">

              <h3
                className="text-[22px] italic text-[#F5F0E8]"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Shop
              </h3>

              <ul className="space-y-3 text-[15px] text-white/80">

                {categories && categories.length > 0 ? (
                  categories.map((category) => (
                    <li key={category.id}>
                      <Link
                        href="/collections"
                        className="transition-colors hover:text-white"
                      >
                        {category.name}
                      </Link>
                    </li>
                  ))
                ) : (
                  <li className="text-white/50">
                    No Categories
                  </li>
                )}

              </ul>

            </div>

            {/* Company */}
            <div className="space-y-4">

              <h3
                className="text-[22px] italic text-[#F5F0E8]"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Company
              </h3>

              <ul className="space-y-3 text-[15px] text-white/80">

                <li>
                  <Link href="/about-us" className="hover:text-white transition-colors">
                    Our Story
                  </Link>
                </li>

                <li>
                  <Link href="/privacy-policy" className="hover:text-white transition-colors">
                    Privacy Policy
                  </Link>
                </li>

                <li>
                  <Link href="/terms-and-conditions" className="hover:text-white transition-colors">
                    Terms & Services
                  </Link>
                </li>

                <li>
                  <Link
                    href="/exchange-policy" className="hover:text-white transition-colors">
                    Exchange Policy
                  </Link>
                </li>

              </ul>

            </div>

            {/* Support */}
            <div className="space-y-4">

              <h3
                className="text-[22px] italic text-[#F5F0E8]"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Support
              </h3>

              <ul className="space-y-3 text-[15px] text-white/80">

                <li>
                  <Link href="/shipping&returns" className="hover:text-white transition-colors">
                    Shipping & Returns
                  </Link>
                </li>

                <li>
                  <Link href="/size-guide" className="hover:text-white transition-colors">
                    Size Guide
                  </Link>
                </li>

                <li>
                  <Link href="/contact-us" className="hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>

              </ul>

            </div>

            {/* Connect */}
            <div className="space-y-4">

              <h3
                className="text-[22px] italic text-[#F5F0E8]"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Connect
              </h3>

              <ul className="space-y-3 text-[15px] text-white/80">

                <li>
                  <Link
                    href="https://instagram.com"
                    target="_blank"
                    className="hover:text-white transition-colors"
                  >
                    Instagram
                  </Link>
                </li>

                <li>
                  <Link
                    href="https://facebook.com"
                    target="_blank"
                    className="hover:text-white transition-colors"
                  >
                    Facebook
                  </Link>
                </li>

                <li>
                  <Link
                    href="https://ziea.in"
                    target="_blank"
                    className="hover:text-white transition-colors"
                  >
                    Website
                  </Link>
                </li>

              </ul>

            </div>

          </div>

        </div>

        {/* Bottom */}
        <div className="mt-12 border-t border-white/10 pt-6">

          <p className="text-center text-[11px] uppercase tracking-[0.18em] text-white/60 md:text-left">
            © {new Date().getFullYear()} ZIEA. All Rights Reserved.
          </p>

        </div>

      </div>
    </footer>
  );
}