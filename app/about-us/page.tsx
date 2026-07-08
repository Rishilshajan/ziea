import { Metadata } from 'next';
import Header from '../../components/client/layout/Header';
import Footer from '../../components/server/layout/Footer';
import HeroSection from '../../components/server/about/HeroSection';
import NarrativeSection from '../../components/server/about/NarrativeSection';
import PhilosophySection from '../../components/server/about/PhilosophySection';
import EditorialCTA from '../../components/server/about/EditorialCTA';
import CraftsmanshipCarousel from '../../components/client/about/CraftsmanshipCarousel';
import MobileImageSlider from '../../components/client/about/MobileImageSlider';

export const metadata: Metadata = {
  title: 'ZIEA | Our Heritage',
  description: 'A tribute to slow living, inspired by the gentle rhythm of Kerala\'s heart.',
};

export default function AboutUsPage() {
  return (
    <>
      <Header />

      <main className="pt-16 pb-0 md:pt-20 bg-[#F5F0E8]">

        <div className="flex flex-col md:flex-row relative bg-[#F5F0E8]">
          {/* Left Side: Fixed Image Area */}
          <div className="hidden md:block w-1/2 sticky top-20 h-[calc(100vh-80px)] overflow-hidden">
            <img
              alt="A serene, high-fidelity landscape photograph of the rolling green tea plantations in Munnar, Kerala at dawn."
              className="w-full h-full object-cover brightness-95"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuD_H16GCEqOX20nTrx6JIViHELuqM1mo4t0DmneeEo4qRuHiHF8cxHK9eNnREb9MzjlG1HLp0k4dDGN-hmp2LaF79EDsbcRgSe8HzaE9ghbrC7KzV0NNs7sKIwyItuItuJHgxmgvTwFpONn8ugNJReG575-0ITxpFMqoDCSyHWRXbUZriMISur3g48RKyLZ1LjBxsD9oROAg9SMMKNd9J3XnkeSY71D2_vRhxCAAi3nogchr96syBF0qWUONYKhh2t_J88cnTpKAUQ"
            />
            <div className="absolute inset-0 bg-deep-forest/10"></div>
          </div>

          {/* Right Side: Scrolling Content Area */}
          <div className="w-full md:w-1/2 flex flex-col">
            <HeroSection />
            <MobileImageSlider />
            <NarrativeSection />
            <CraftsmanshipCarousel />
          </div>
        </div>

        <PhilosophySection />
        <EditorialCTA />
      </main>

      <Footer />
    </>
  );
}
