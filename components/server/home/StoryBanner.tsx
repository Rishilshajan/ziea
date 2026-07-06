import Link from "next/link";

export default function StoryBanner() {
  return (
    <section className="mt-section-gap px-margin-mobile">
      <div className="bg-primary/20 rounded-3xl p-10 flex flex-col items-center text-center space-y-6 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/linen.png')" }}
        />
        <h3 className="cormorant text-4xl text-primary-dark font-light italic">Our Story</h3>
        <p className="font-body-md text-text max-w-md mx-auto leading-relaxed">
          Rooted in the serene landscapes of Kerala, ZIEA celebrates the heritage of hand-woven comfort. Every piece is a love letter to the soft breeze of the backwaters and the tactile luxury of natural fibers.
        </p>
        <Link
          href="#"
          className="inline-flex items-center gap-2 text-secondary font-semibold hover:gap-3 transition-all"
        >
          Read More
          <span className="material-symbols-outlined text-sm">arrow_forward</span>
        </Link>
      </div>
    </section>
  );
}
