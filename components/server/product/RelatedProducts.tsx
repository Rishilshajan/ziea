import React from 'react';
import ProductCard from '../../client/collections/ProductCard';

export default function RelatedProducts() {
  const baseProducts = [
    {
      title: "Emerald Elegance Ethnic Set",
      price: "₹ 2,193",
      color: "Emerald",
      colorClass: "text-[#4c623d]",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAb-qnhLgrpzLCx7SbNEqrbvML3b1AKXTT6QdZz4nmBOL2bHd11euqwpqNa425av4q2WRz25QjiFGYHi9Qa9ogm_7dMlYtRYRk3o3QInW31a61R774oVNebahwf83LmgDl8PaCPXSccdWARRAiAjjEPrCH9kXwAOPTV0YvS87c2zMr4LQs2jKJDk3_z495Or85viTTbb-0ZDnbhrTGpsxTpnJoDVlnYosQUwJjON6bnb7CQTaBOfYRtfq0eQFs6EhfXvOMpykdXRzc",
      dateAdded: "Delivery by Jul 19, 2026",
    },
    {
      title: "The Maroon Embroidered Fusion",
      price: "₹ 1,493",
      color: "Maroon",
      colorClass: "text-[#865139]",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBU5D7k4cggo5rpQ2daEtDxkVJDOuJndf0i9fFn2WGU9edRZd6ldgUAizkPId-A3Rs5KCk4wUp1X34GNVruCQf0iFxvehCGfymAoLIeTXykv_U3Ny4-aMS6AKMWDlBg_Os7ceJ1n8KebIKSd6wZ8y_Xh0ZTRvuprLUUb7XMlMw-1eUYfg2tUNAi83t_-cgCRw8MRVOpZXc8amKWHu-gdyo9atUuZPHv6dBy17g0LYltMHWgtcr8s_RGe19JSwcapu0QQ1B1iXHoDJ0",
      dateAdded: "Delivery by Jul 18, 2026",
    },
    {
      title: "Sunshine Kurti Set",
      price: "₹ 1,400",
      color: "Mustard",
      colorClass: "text-[#d6c3b3]",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAbOskIkcVhsZjpcnbPyBkTn-F9soel_NZJRgOrFA720NTemrU7ta3a1G5amB7q5cVLMuCKJB8eUzUlE5m0EstrAVv8A_4uyOnmlxuj8yZioWbnbWPtG5PJQzyPlKHa43VHmMb2K228Ng8LM2Mz1oxQaRzioLXYva-CJSk-Gvudi_CJ9KcCxCtfZW4q79x3hi0GzKNIA-8xMHOS0XQCaKLjr0xyg0FFJzbdU5v971D7wLYP7faLVdW2UXIqcTCq03nwkvfdS1NYj2k",
      dateAdded: "Delivery by Jul 14, 2026",
    },
    {
      title: "Navy Grace Embroidered Suit",
      price: "₹ 1,353",
      color: "Navy",
      colorClass: "text-[#211a15]",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAb-qnhLgrpzLCx7SbNEqrbvML3b1AKXTT6QdZz4nmBOL2bHd11euqwpqNa425av4q2WRz25QjiFGYHi9Qa9ogm_7dMlYtRYRk3o3QInW31a61R774oVNebahwf83LmgDl8PaCPXSccdWARRAiAjjEPrCH9kXwAOPTV0YvS87c2zMr4LQs2jKJDk3_z495Or85viTTbb-0ZDnbhrTGpsxTpnJoDVlnYosQUwJjON6bnb7CQTaBOfYRtfq0eQFs6EhfXvOMpykdXRzc",
      dateAdded: "Delivery by Jul 17, 2026",
    }
  ];

  return (
    <div className="w-full space-y-6">
      <h2 className="cormorant text-3xl text-primary font-bold">You May Also Like</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 xl:gap-8">
        {baseProducts.map((product, index) => (
          <ProductCard key={index} {...product} />
        ))}
      </div>
    </div>
  );
}
