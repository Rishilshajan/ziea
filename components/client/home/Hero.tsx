"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "../../ui/Button";

export default function Hero() {
  const bgRef = useRef<HTMLDivElement>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const heroImages = [
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAniSGiKPmmlLxVwMjBMEyjkPRSreeNOfkLxIDAsiWu4inboYwYHR5NdwZ5-3mZF92_pjr_CiBTt-OlWgjOLMfhJ3b1MAzpzWz6QKspRlagrFpweDcm3jV3s11W0FXM-OFHkrHGv189dAHLRH2XHsK2ikJMfPIkavF-QVOKxUrec2nhyT6Rz1DNTdLmY7Dddq9DaEBpYMDSvldMmRD9tUozkma4vqM8M2_WJ_tsGvNRTzEYwdhTBJCYtdcw5sh3wrq9OjVhJziMoKA",
    "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&q=80",
    "https://images.unsplash.com/photo-1434389678232-0545a90962b1?w=1200&q=80",
    "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&q=80"
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (bgRef.current) {
        const scrolled = window.scrollY;
        bgRef.current.style.transform = `translateY(${scrolled * 0.4}px)`;
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex: number) => (prevIndex + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  return (
    <section className="relative w-full h-[400px] md:h-[600px] flex flex-col justify-center items-center px-margin-mobile text-center overflow-hidden bg-primary">
      <div className="absolute inset-0 opacity-40 mix-blend-overlay transition-opacity duration-1000">
        <div
          ref={bgRef}
          className="bg-cover bg-center w-full h-full transition-all duration-1000 ease-in-out"
          title="A cinematic, high-fashion lifestyle shot."
          style={{
            backgroundImage: `url('${heroImages[currentImageIndex]}')`,
          }}
        />
      </div>
      <div className="relative z-10 space-y-6 max-w-2xl">
        <h2 className="cormorant text-5xl md:text-7xl font-light text-on-primary italic">
          New Collection — Kerala Edition
        </h2>
        <p className="font-body-md text-on-primary/90 leading-relaxed max-w-md mx-auto">
          Discover the intersection of natural heritage and everyday luxury with our latest handcrafted linen series.
        </p>
        <div className="flex justify-center">
          <Button variant="primary">
            Explore Now
          </Button>
        </div>
      </div>
      
      {/* Next Image Button */}
      <button 
        onClick={() => setCurrentImageIndex((prevIndex: number) => (prevIndex + 1) % heroImages.length)}
        className="absolute bottom-6 z-20 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center hover:bg-white/40 transition-colors border border-white/30"
      >
        <span className="material-symbols-outlined text-white">chevron_right</span>
      </button>
    </section>
  );
}
