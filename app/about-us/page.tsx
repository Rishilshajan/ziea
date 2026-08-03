import { Metadata } from 'next';
import Link from 'next/link';
import Header from '../../components/client/layout/Header';
import Footer from '../../components/server/layout/Footer';
import HeroSection from '../../components/server/about/HeroSection';
import NarrativeSection from '../../components/server/about/NarrativeSection';
import PhilosophySection from '../../components/server/about/PhilosophySection';
import EditorialCTA from '../../components/server/about/EditorialCTA';
import CraftsmanshipCarousel from '../../components/client/about/CraftsmanshipCarousel';
import MobileImageSlider from '../../components/client/about/MobileImageSlider';
import SmartImage from '../../components/ui/SmartImage';
import { getBranding } from '@/utils/branding.server';

export const metadata: Metadata = {
  title: 'ZIEA | Our Heritage',
  description: 'A tribute to slow living, inspired by the gentle rhythm of Kerala\'s heart.',
};

const FALLBACK_HERO = {
  url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD_H16GCEqOX20nTrx6JIViHELuqM1mo4t0DmneeEo4qRuHiHF8cxHK9eNnREb9MzjlG1HLp0k4dDGN-hmp2LaF79EDsbcRgSe8HzaE9ghbrC7KzV0NNs7sKIwyItuItuJHgxmgvTwFpONn8ugNJReG575-0ITxpFMqoDCSyHWRXbUZriMISur3g48RKyLZ1LjBxsD9oROAg9SMMKNd9J3XnkeSY71D2_vRhxCAAi3nogchr96syBF0qWUONYKhh2t_J88cnTpKAUQ',
  cropX: 50, cropY: 50, zoom: 100,
};

export default async function AboutUsPage() {
  const { about } = await getBranding();
  const heroImg = about.hero ?? FALLBACK_HERO;
  return (
    <>
      <Header />

      <main className="pt-16 pb-0 md:pt-20 bg-[#F5F0E8]">

        <div className="flex flex-col md:flex-row relative bg-[#F5F0E8]">
          {/* Left Side: Fixed Image Area */}
          <div className="hidden md:block w-1/2 sticky top-20 h-[calc(100vh-80px)] overflow-hidden">
            <SmartImage
              src={heroImg.url}
              alt="ZIEA heritage"
              cropX={heroImg.cropX}
              cropY={heroImg.cropY}
              zoom={heroImg.zoom}
              sizes="50vw"
              priority
              className="brightness-95"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/25 to-transparent z-10"></div>

            {/* Breadcrumb over the image (top-left), matching Contact Us */}
            <nav className="absolute top-6 left-8 z-20 flex items-center text-sm text-white/85 drop-shadow">
              <Link href="/" className="transition-colors hover:text-white">Home</Link>
              <span className="mx-2 text-white/50">/</span>
              <span className="text-white">About Us</span>
            </nav>
          </div>

          {/* Right Side: Scrolling Content Area */}
          <div className="w-full md:w-1/2 flex flex-col">
            <HeroSection />
            <MobileImageSlider images={about.mobileSlides} />
            <NarrativeSection />
            <CraftsmanshipCarousel images={about.craftsmanship} />
          </div>
        </div>

        <PhilosophySection image={about.philosophy} />
        <EditorialCTA />
      </main>

      <Footer />
    </>
  );
}
