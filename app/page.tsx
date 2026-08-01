import Header from "../components/client/layout/Header";
import Hero from "../components/client/home/Hero";
import CategoryPills from "../components/server/home/CategoryPills";
import CollectionsGrid from "../components/server/home/CollectionsGrid";
import StoryBanner from "../components/server/home/StoryBanner";
//import JournalSection from "../components/server/home/JournalSection";
import Footer from "../components/server/layout/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="mt-16 md:mt-20 overflow-x-hidden flex flex-col gap-10 pb-10">
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
