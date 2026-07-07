import { Metadata } from 'next';
import Link from 'next/link';
import Header from '../../../components/client/layout/Header';
import ProductGallery from '../../../components/client/product/ProductGallery';
import ProductActions from '../../../components/client/product/ProductActions';
import ProductInfo from '../../../components/server/product/ProductInfo';
import RelatedProducts from '../../../components/server/product/RelatedProducts';
import Footer from '../../../components/server/layout/Footer';

// Mock Data
const mockProduct = {
  title: "Royal Azure Embroidered Kurta Set",
  price: "₹ 1,493.00",
  description: "This is a 3-piece straight-cut kurta set with pants and dupatta. Falls under modern ethnic wear / semi-festive wear. Fabric Kurta & Bottom: Likely cotton or cotton-silk blend – smooth, breathable, and slightly structured. Dupatta: Chiffon or organza blend – lightweight, sheer, and flowy, adding elegance. Color: Rich royal blue tone, giving a premium and graceful look. Print & Work: Features floral embroidery on the neckline and chest area. The embroidery includes pink and pastel threadwork, creating a soft contrast on the blue base.",
  images: [
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAb-qnhLgrpzLCx7SbNEqrbvML3b1AKXTT6QdZz4nmBOL2bHd11euqwpqNa425av4q2WRz25QjiFGYHi9Qa9ogm_7dMlYtRYRk3o3QInW31a61R774oVNebahwf83LmgDl8PaCPXSccdWARRAiAjjEPrCH9kXwAOPTV0YvS87c2zMr4LQs2jKJDk3_z495Or85viTTbb-0ZDnbhrTGpsxTpnJoDVlnYosQUwJjON6bnb7CQTaBOfYRtfq0eQFs6EhfXvOMpykdXRzc",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBU5D7k4cggo5rpQ2daEtDxkVJDOuJndf0i9fFn2WGU9edRZd6ldgUAizkPId-A3Rs5KCk4wUp1X34GNVruCQf0iFxvehCGfymAoLIeTXykv_U3Ny4-aMS6AKMWDlBg_Os7ceJ1n8KebIKSd6wZ8y_Xh0ZTRvuprLUUb7XMlMw-1eUYfg2tUNAi83t_-cgCRw8MRVOpZXc8amKWHu-gdyo9atUuZPHv6dBy17g0LYltMHWgtcr8s_RGe19JSwcapu0QQ1B1iXHoDJ0",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAbOskIkcVhsZjpcnbPyBkTn-F9soel_NZJRgOrFA720NTemrU7ta3a1G5amB7q5cVLMuCKJB8eUzUlE5m0EstrAVv8A_4uyOnmlxuj8yZioWbnbWPtG5PJQzyPlKHa43VHmMb2K228Ng8LM2Mz1oxQaRzioLXYva-CJSk-Gvudi_CJ9KcCxCtfZW4q79x3hi0GzKNIA-8xMHOS0XQCaKLjr0xyg0FFJzbdU5v971D7wLYP7faLVdW2UXIqcTCq03nwkvfdS1NYj2k"
  ]
};

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `ZIEA - ${mockProduct.title}`,
    description: mockProduct.description.substring(0, 160) + "...",
  };
}

export default function ProductDetailPage() {
  return (
    <>
      <Header />
      
      <main className="pt-20 md:pt-28 pb-16 min-h-screen w-full px-4 xl:px-8 max-w-[1600px] mx-auto">
        
        {/* Breadcrumbs */}
        <div className="mb-6 md:mb-8 mt-0">
          <nav className="flex text-[13px] md:text-sm text-[#44483f]">
            <Link href="/" className="hover:text-[#4c623d] transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/collections" className="hover:text-[#4c623d] transition-colors">Cordset</Link>
            <span className="mx-2">/</span>
            <span className="text-[#211a15] truncate max-w-[150px] md:max-w-xs">{mockProduct.title}</span>
          </nav>
        </div>

        {/* Product Layout */}
        <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-[1fr_1fr] xl:grid-cols-[5.5fr_4.5fr] gap-6 md:gap-10 lg:gap-16">
          
          {/* Left Column: Gallery */}
          <div className="w-full">
            <ProductGallery images={mockProduct.images} />
          </div>

          {/* Right Column: Info & Actions */}
          <div className="w-full flex flex-col gap-6 pt-2 md:pt-0">
            <ProductInfo 
              title={mockProduct.title} 
              price={mockProduct.price} 
              description={mockProduct.description} 
            />
            <ProductActions />
          </div>

        </div>

        {/* Related Products Section */}
        <div className="mt-24 pt-16 border-t border-[#eee0d6]">
          <RelatedProducts />
        </div>

      </main>

      <Footer />
    </>
  );
}
