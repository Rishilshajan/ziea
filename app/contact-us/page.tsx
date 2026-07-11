import { Metadata } from 'next';
import Link from 'next/link';
import Header from '../../components/client/layout/Header';
import Footer from '../../components/server/layout/Footer';
import ContactForm from '../../components/client/contact/ContactForm';
import ContactInfo from '../../components/server/contact/ContactInfo';
import HeritageSection from '../../components/server/contact/HeritageSection';

export const metadata: Metadata = {
  title: 'Connect With Us | ZIEA',
  description: 'Reach out for inquiries, collaborations, or simply to share your thoughts on natural luxury. Visit our studio in Fort Kochi.',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#F5F0E8] text-[#211a15] font-jost selection:bg-primary/20 flex flex-col">
      <Header />
      
      <main className="flex-grow pt-20 md:pt-24 pb-16 px-4 xl:px-8 w-full">
        {/* Breadcrumbs */}
        <div className="mb-4 md:mb-6 mt-0">
          <nav className="inline-flex text-[13px] md:text-sm text-[#44483f]">
             <Link href="/" className="hover:text-[#4c623d] transition-colors">Home</Link>
             <span className="mx-2 text-[#44483f]/60">/</span>
             <span className="text-[#211a15]">Contact Us</span>
          </nav>
        </div>

        {/* Page Header */}
        <div className="mb-16 text-center max-w-3xl mx-auto px-4 md:px-12">
          <h2 className="cormorant text-5xl md:text-6xl text-primary italic mb-6">Connect With Us</h2>
          <p className="font-jost text-on-surface-variant md:text-lg max-w-2xl mx-auto">
            We invite you to reach out for inquiries, collaborations, or simply to share your thoughts on natural luxury.
          </p>
        </div>

        {/* Content Container with standard page guttering */}
        <div className="w-full">
          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
            <ContactForm />
            <ContactInfo />
          </div>

          {/* Heritage Section */}
          <HeritageSection />
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
