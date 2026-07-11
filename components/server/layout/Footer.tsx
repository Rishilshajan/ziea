import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#2C3829] text-surface pt-12 pb-20">
      <div className="w-full px-4 xl:px-8 space-y-12 md:space-y-16">
        <div className="flex flex-col lg:flex-row justify-between gap-12 lg:gap-8">
          <div className="space-y-8 lg:w-1/3">
            <Image src="/Ziea_Logo.png" alt="ZIEA" width={400} height={200} className="h-24 w-auto object-contain object-left brightness-0 invert origin-left scale-[2] -ml-4" priority />
            <div className="space-y-4">
              <p className="font-label-md uppercase tracking-wider">Join our Journal</p>
              <div className="flex gap-2 max-w-sm">
                <input type="email" placeholder="Email address" className="bg-transparent border-b border-surface/30 py-2 flex-grow font-body-md focus:outline-none focus:border-surface transition-colors placeholder:text-surface/50 text-surface" />
                <button className="bg-[#7A9268] text-white px-6 py-2 rounded-full font-label-md active:scale-95 transition-transform hover:bg-[#647b53]">Join</button>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-8 lg:w-[65%]">
          <div className="space-y-4">
            <h3 className="cormorant text-xl italic text-primary-fixed">Shop</h3>
            <ul className="jost space-y-2 text-surface/80 text-sm">
              <li><Link href="#" className="hover:text-white transition-colors">Nightwear</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Loungewear</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">New Arrivals</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Best Sellers</Link></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="cormorant text-xl italic text-primary-fixed">Company</h3>
            <ul className="jost space-y-2 text-surface/80 text-sm">
              <li><Link href="#" className="hover:text-white transition-colors">Our Story</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Journal</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Sustainability</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Careers</Link></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="cormorant text-xl italic text-primary-fixed">Support</h3>
            <ul className="jost space-y-2 text-surface/80 text-sm">
              <li><Link href="#" className="hover:text-white transition-colors">Shipping</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Returns</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Size Guide</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="cormorant text-xl italic text-primary-fixed">Connect</h3>
            <ul className="jost space-y-2 text-surface/80 text-sm">
              <li><Link href="#" className="hover:text-white transition-colors">Instagram</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Pinterest</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Facebook</Link></li>
            </ul>
          </div>
          </div>
        </div>
        <div className="pt-8 border-t border-surface/10 space-y-4 md:flex md:justify-between md:items-center md:space-y-0">
          <p className="jost text-[10px] text-surface/60 uppercase tracking-widest">© {new Date().getFullYear()} ZIEA. All Rights Reserved.</p>
          <div className="flex gap-4 jost text-[10px] text-surface/60 uppercase tracking-widest">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
