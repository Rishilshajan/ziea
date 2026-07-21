import Header from "../components/client/layout/Header";
import Hero from "../components/client/home/Hero";
import CategoryPills from "../components/server/home/CategoryPills";
import CollectionsGrid from "../components/server/home/CollectionsGrid";
import StoryBanner from "../components/server/home/StoryBanner";
//import JournalSection from "../components/server/home/JournalSection";
import Footer from "../components/server/layout/Footer";
import SplashController from "../components/client/home/SplashController";

export default function Home() {
  return (
    <>
      <SplashController />
      <Header />
      <main className="mt-16 md:mt-20 overflow-x-hidden">
        <Hero />
        <CategoryPills />
        <CollectionsGrid />
        <StoryBanner />
        {/*<JournalSection />*/}
      </main>
      <Footer />
    </>
  );
}
