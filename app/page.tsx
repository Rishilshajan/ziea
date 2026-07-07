"use client";

import { useState, useEffect } from "react";
import Header from "../components/client/layout/Header";
import Hero from "../components/client/home/Hero";
import CategoryPills from "../components/server/home/CategoryPills";
import CollectionsGrid from "../components/server/home/CollectionsGrid";
import StoryBanner from "../components/server/home/StoryBanner";
import JournalSection from "../components/server/home/JournalSection";
import SplashScreen from "../components/client/home/SplashScreen";
import Footer from "../components/server/layout/Footer";

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const hasSeenSplash = sessionStorage.getItem('hasSeenSplash');
    if (hasSeenSplash) {
      setShowSplash(false);
    } else {
      sessionStorage.setItem('hasSeenSplash', 'true');
    }
  }, []);

  useEffect(() => {
    if (showSplash) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showSplash]);

  return (
    <>
      {showSplash && <SplashScreen onDismiss={() => setShowSplash(false)} />}

      {/* We always render the main content to avoid layout shift and allow image preloading, 
          but it's technically behind the splash screen due to z-index. */}
      <Header />
      <main className="mt-16 md:mt-20 overflow-x-hidden">
        <Hero />
        <CategoryPills />
        <CollectionsGrid />
        <StoryBanner />
        <JournalSection />
      </main>
      <Footer />
    </>
  );
}
