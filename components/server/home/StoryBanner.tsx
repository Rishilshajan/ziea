import Link from "next/link";
import { MdOutlineArrowForward } from "react-icons/md";

export default function StoryBanner() {
  return (
    <section className="px-margin-mobile">
      <div className="bg-primary/20 rounded-3xl p-10 flex flex-col items-center text-center space-y-6 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/linen.png')" }}
        />
        <h3 className="cormorant text-4xl text-primary-dark font-light italic">Our Story</h3>
        <div className="space-y-4 max-w-md mx-auto">
          <p className="font-body-md text-text leading-relaxed">
            We believe every woman deserves to feel seen, comfortable, and beautiful in her own skin. Our clothes are made to celebrate you, quietly supporting your day with love and care.
          </p>
          <div className="pt-2 space-y-2">
            <h4 className="cormorant text-2xl text-primary-dark font-light italic">Who We Are</h4>
            <p className="font-body-md text-text leading-relaxed">
              Ziea is a women’s wear brand specializing in maternity, feeding, and comfortable everyday wear.
            </p>
          </div>
        </div>
        <Link
          href="#"
          className="inline-flex items-center gap-2 text-secondary font-semibold hover:gap-3 transition-all"
        >
          Read More
          <MdOutlineArrowForward className="text-sm" />
        </Link>
      </div>
    </section>
  );
}
