import Header from "../components/client/layout/Header";
import Hero from "../components/client/home/Hero";
import CategoryPills from "../components/server/home/CategoryPills";
import CollectionsGrid from "../components/server/home/CollectionsGrid";
import StoryBanner from "../components/server/home/StoryBanner";
//import JournalSection from "../components/server/home/JournalSection";
import Footer from "../components/server/layout/Footer";
import { getBranding } from "@/utils/branding.server";

export default async function Home() {
  const { home } = await getBranding();
  return (
    <>
      <Header />
      <main className="mt-16 md:mt-20 overflow-x-hidden flex flex-col gap-8 md:gap-6 pb-10">
        <Hero slides={home.heroSlides} />
        <CategoryPills />
        <CollectionsGrid />
        <StoryBanner />
        {/*<JournalSection />*/}
      </main>
      <Footer />
    </>
  );
}
