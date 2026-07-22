"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { Button } from "../../ui/Button";

interface SlideData {
  image: string;
  subHeadline: string;
}

export default function Hero() {
  const bgRef = useRef<HTMLDivElement>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsLoggedIn(!!session);
      setIsAuthLoading(false);
    };
    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session);
    });

    return () => subscription.unsubscribe();
  }, [supabase]);

  const slides: SlideData[] = [
    {
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAniSGiKPmmlLxVwMjBMEyjkPRSreeNOfkLxIDAsiWu4inboYwYHR5NdwZ5-3mZF92_pjr_CiBTt-OlWgjOLMfhJ3b1MAzpzWz6QKspRlagrFpweDcm3jV3s11W0FXM-OFHkrHGv189dAHLRH2XHsK2ikJMfPIkavF-QVOKxUrec2nhyT6Rz1DNTdLmY7Dddq9DaEBpYMDSvldMmRD9tUozkma4vqM8M2_WJ_tsGvNRTzEYwdhTBJCYtdcw5sh3wrq9OjVhJziMoKA",
      subHeadline: "Clothes designed for women who like their style simple, natural, and effortless.",
    },
    {
      image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&q=80",
      subHeadline: "Clothes that don't try too hard - they just fit, move, and feel right.",
    },
    {
      image: "https://images.unsplash.com/photo-1434389678232-0545a90962b1?w=1200&q=80",
      subHeadline: "Styles for women who show up as they are - clear, confident, and composed.",
    },
  ];

  const headlines = [
    "Ziea - Style that feels just right.",
    "Ziea - Style that feels natural.",
    "Ziea - The Evolution of SHE!",
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
      setCurrentImageIndex((prevIndex: number) => (prevIndex + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const handleShopNow = () => {
    if (isLoggedIn) {
      router.push("/cart");
    } else {
      router.push("/login");
    }
  };

  const handleViewCollection = () => {
    const collectionsSection = document.getElementById("collections");
    if (collectionsSection) {
      collectionsSection.scrollIntoView({ behavior: "smooth" });
    } else {
      router.push("/collections");
    }
  };

  const goToSlide = (index: number) => {
    setCurrentImageIndex(index);
  };

  const currentSlide = slides[currentImageIndex];
  const currentHeadline = headlines[currentImageIndex % headlines.length];

  return (
    <section
      id="hero"
      className="relative w-full h-[450px] md:h-[500px] lg:h-[550px] flex flex-col justify-center items-center text-center overflow-hidden"
    >
      {/* Background Image with Parallax */}
      <div className="absolute inset-0 transition-opacity duration-1000">
        <div
          ref={bgRef}
          className="bg-cover bg-center w-full h-[120%] transition-all duration-1000 ease-in-out"
          style={{
            backgroundImage: `url('${currentSlide.image}')`,
          }}
        />
        <div className="absolute inset-0 bg-[#2C3829]/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 space-y-4 max-w-2xl px-6 md:px-10">
        {/* Headline - Cormorant Garamond */}
        <h1
          className="text-3xl md:text-5xl lg:text-6xl font-light text-[#F5F0E8] leading-tight transition-all duration-700"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          <span className="italic">Ziea</span>
          <span className="not-italic inline-block px-1.5" style={{ fontStyle: 'normal', fontFamily: "'Jost', sans-serif" }}>-</span>
          <span className="italic">
            {currentHeadline.replace(/^Ziea - /, "")}
          </span>
        </h1>

        {/* Sub-headline - Jost */}
        <p
          className="text-sm md:text-base text-[#F5F0E8]/85 leading-relaxed max-w-lg mx-auto transition-all duration-700"
          style={{ fontFamily: "'Jost', sans-serif" }}
        >
          {currentSlide.subHeadline}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-row justify-center gap-3 pt-2 w-full">
          <Button
            variant="auth-primary"
            onClick={handleShopNow}
            disabled={isAuthLoading}
            className="flex-1 sm:flex-none sm:w-[240px] text-[13px] sm:text-sm px-2 sm:px-4"
          >
            {isAuthLoading ? "Loading..." : "Shop Now"}
          </Button>

          <Button
            variant="auth-social"
            onClick={handleViewCollection}
            className="flex-1 sm:flex-none sm:w-[240px] text-[13px] sm:text-sm px-2 sm:px-4 !bg-transparent !border-[#F5F0E8] !text-[#F5F0E8] hover:!bg-white/10"
          >
            View Collection
          </Button>
        </div>
      </div>

      {/* Slide Navigation Dots */}
      <div className="absolute bottom-6 z-20 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentImageIndex
              ? 'bg-[#F5F0E8] w-6'
              : 'bg-[#F5F0E8]/40 hover:bg-[#F5F0E8]/60'
              }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}