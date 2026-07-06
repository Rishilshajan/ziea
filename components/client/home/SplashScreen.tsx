"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "../../ui/Button";

interface SplashScreenProps {
  onDismiss: () => void;
}

export default function SplashScreen({ onDismiss }: SplashScreenProps) {
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [useAltLogo, setUseAltLogo] = useState(false);

  useEffect(() => {
    const handleScroll = (e: WheelEvent | TouchEvent) => {
      if (e.type === "wheel" && (e as WheelEvent).deltaY <= 0) {
        return; // Only dismiss on scroll down
      }
      setIsFadingOut((prev) => {
        if (!prev) {
          setTimeout(() => {
            onDismiss();
          }, 800);
          return true;
        }
        return prev;
      });
    };

    window.addEventListener("wheel", handleScroll);
    window.addEventListener("touchmove", handleScroll);

    return () => {
      window.removeEventListener("wheel", handleScroll);
      window.removeEventListener("touchmove", handleScroll);
    };
  }, [onDismiss]);

  const handleDismiss = () => {
    setIsFadingOut((prev) => {
      if (!prev) {
        setTimeout(() => {
          onDismiss();
        }, 800);
        return true;
      }
      return prev;
    });
  };

  return (
    <main
      className={`fixed inset-0 z-[100] w-full h-screen flex flex-col items-center justify-center bg-primary-dark transition-page overflow-hidden ${
        isFadingOut ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Ambient Decorative Gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] bg-primary opacity-[0.12] blur-[120px] rounded-full float-slow"></div>
        <div className="absolute -bottom-[10%] -right-[5%] w-[50%] h-[50%] bg-accent opacity-[0.15] blur-[100px] rounded-full float-reverse"></div>
      </div>

      {/* Center Brand Container */}
      <div className="relative z-10 text-center px-margin-mobile fade-in">
        {/* Logo Section */}
        <div 
          className="flex justify-center mb-6 cursor-pointer hover:opacity-90 transition-opacity"
          onClick={() => setUseAltLogo(!useAltLogo)}
          title="Click to toggle logo variation"
        >
          <Image 
            src={useAltLogo ? "/ZIEA_Splash2.png" : "/Ziea_Splash.png"}
            alt="ZIEA" 
            width={400} 
            height={200} 
            className="w-56 md:w-80 object-contain drop-shadow-md"
            priority 
          />
        </div>

        {/* Subtitle Section */}
        <div className="overflow-hidden mb-12">
          <p
            className="jost text-primary-light uppercase tracking-[0.25em] pl-[0.25em] text-label-sm md:text-label-md opacity-0 fade-in"
            style={{ animationDelay: "0.3s" }}
          >
            Clothing — Everyday Comfort
          </p>
        </div>

        {/* Action Button */}
        <div
          className="flex justify-center opacity-0 fade-in"
          style={{ animationDelay: "0.5s" }}
        >
          <Button
            onClick={handleDismiss}
            className="group relative overflow-hidden bg-primary text-background px-10 py-4 rounded-full font-label-md transition-all duration-300 hover:scale-[1.03] active:scale-95 shadow-lg shadow-black/20"
          >
            <span className="relative z-10 uppercase tracking-widest">Shop Now</span>
            <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          </Button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-0 fade-in"
        style={{ animationDelay: "1s" }}
      >
        <span className="text-background jost text-[10px] uppercase tracking-widest opacity-40">
          Explore
        </span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-background to-transparent opacity-40"></div>
      </div>
    </main>
  );
}
