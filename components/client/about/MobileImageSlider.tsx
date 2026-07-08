"use client";

import React, { useState, useEffect } from 'react';

const images = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuD_H16GCEqOX20nTrx6JIViHELuqM1mo4t0DmneeEo4qRuHiHF8cxHK9eNnREb9MzjlG1HLp0k4dDGN-hmp2LaF79EDsbcRgSe8HzaE9ghbrC7KzV0NNs7sKIwyItuItuJHgxmgvTwFpONn8ugNJReG575-0ITxpFMqoDCSyHWRXbUZriMISur3g48RKyLZ1LjBxsD9oROAg9SMMKNd9J3XnkeSY71D2_vRhxCAAi3nogchr96syBF0qWUONYKhh2t_J88cnTpKAUQ",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAzAh8hLHoluGrjrRVW-VFssmyRLiCa0p-7ZIUUX28ZeafKBRJeTNdFZpEW9IAUiPsRB73o44kYAAZjY9aqia0fE0hPxqlTXpaTHVWTkmYNqwYfq4qpLjSGNL9mJKj_XoQiiOY8YKNsyHwGIR8FNQFoke_TIHk7J6c03Fr6X-mAMNSzJqo41lt7lKIJH0a3a65za08L-uRN7YXuGiweohPwXRXEhQ4IWSyoAI09zZcWzzH6octqPh9xKSZ0bP6gBWaGywx-4d_wnZU"
];

export default function MobileImageSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="md:hidden relative w-full h-[350px] overflow-hidden">
      <div className="relative w-full h-full shadow-md">
        {images.map((img, idx) => {
          let transformClass = 'translate-x-full opacity-0';
          
          if (idx === currentIndex) {
            transformClass = 'translate-x-0 opacity-100 z-10';
          } else if (idx === (currentIndex - 1 + images.length) % images.length) {
             transformClass = '-translate-x-full opacity-0';
          }

          return (
            <img
              key={idx}
              src={img}
              alt="ZIEA Heritage"
              className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-in-out ${transformClass}`}
            />
          );
        })}
      </div>
    </div>
  );
}
