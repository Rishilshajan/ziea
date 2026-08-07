import Link from "next/link";
import { MdOutlineArrowForward } from "react-icons/md";

export default function StoryBanner() {
  return (
    <section className="px-page">
      <div className="bg-primary/20 rounded-3xl px-8 py-8 md:px-16 md:py-10 flex flex-col items-center text-center space-y-6 md:space-y-8 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/linen.png')" }}
        />
        <h2 className="cormorant text-4xl md:text-6xl text-primary-dark font-light">Our Story</h2>
        <div className="space-y-5 md:space-y-6 max-w-2xl mx-auto">
          <p className="text-text leading-relaxed text-lg md:text-xl">
            We believe every woman deserves to feel seen, comfortable, and beautiful in her own skin. Our clothes are made to celebrate you, quietly supporting your day with love and care.
          </p>
          <div className="pt-2 space-y-3">
            <h3 className="cormorant text-2xl md:text-4xl text-primary-dark font-light">Who We Are</h3>
            <p className="text-text leading-relaxed text-lg md:text-xl">
              Ziea is a women’s wear brand specializing in maternity, feeding, and comfortable everyday wear.
            </p>
          </div>
        </div>
        <Link
          href="/about-us"
          className="inline-flex items-center gap-2 text-[#4c623d] font-semibold text-lg md:text-xl hover:gap-3 transition-all"
        >
          Read our story
          <MdOutlineArrowForward aria-hidden="true" className="text-base md:text-lg" />
        </Link>
      </div>
    </section>
  );
}
