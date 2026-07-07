import ProductCard from "../../client/collections/ProductCard";

import Pagination from "../../client/collections/Pagination";

const products = Array.from({ length: 20 }).map((_, i) => {
  const baseProducts = [
    {
      title: "Ethereal Cotton Gown",
      price: "₹ 2,499",
      color: "Sage Grove",
      colorClass: "text-[#4c623d]",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBSY95RWH1Wo7H19PkacynKlYVolPOtOIyMq6LUl5JHAHt74v3OKePn2HzVtjEnd8ytxfA4LvkNaSBiAqWXt-jCF_0mux_z_ApCMjqdlc9uFeCBYyth0A_Hw7H8lb7GGvTsBh-vHns__TeuqJbk-9wkpPJ1BocwdWTIt3sDxRjZ7J5TIe4MItD46YM52GC8U0pqqUbvx4eUQEqXEwYIMVDKyebTqbvK82XvHxYbDfsBjGNSdnZE0R0SpdGXYjJ3l4ld3YH74X2_ZE4",
      badge: "New",
      badgeClass: "bg-[#865139]",
      altText: "A serene indoor lifestyle photograph of a woman wearing a soft, Sage Grove colored organic cotton nightgown."
    },
    {
      title: "Linen Lounge Set",
      price: "₹ 3,850",
      color: "Terracotta",
      colorClass: "text-[#865139]",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDbiWW7alPv1JKYEjGmfG9faIyZcraUlI4RChzg4flNVGae8IiL2beKt7U1ChVyJ8kdIzc1H3wl_vUULwjW8JGcmhaRCglJDs4WQ2EK6pYrGr5sObXhub9GlYG5qWjETej-v06PhYcrGzv0jRMPZXV1iNJQqxQ0oEy095JHBKWgpX4Jam9rEig-E6t3sdtVHWZlr9El0nl2m_3wUI8kQ4aFlzz2uJ49bwzwwDfZF-lokWla_hfU38_DXVEJNv4JW9-wuEJl6mxrybI",
      altText: "A close-up aesthetic shot of premium linen loungewear in a warm Terracotta hue."
    },
    {
      title: "Silk Sleep Mask",
      price: "₹ 1,200",
      color: "Jasmine White",
      colorClass: "text-[#675a4c]",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDkR5AdgZ6NTzOEWxFr4RAj9O2HNgch1XYkCJkSLTslb7E2TW-5550TuxZFZM3HD_kHjMYCw2fiAruDNW3sG8s0InUdHsqwRVkGnGpBcTLpI40YKdCprCzNTgzoGyO_61SOFVaD5jOZEVkDOL8nFf9Hj-ZC9ekhF2D7v797nZ4p3FpeDj8d8B5hAsgxmam3jUc95F2mUEmhJHZnJuN48gX0RvPlqnItABUNspBaTBlAwbhKHwjEHMM02hAZ_Cy5l-jq2PLJ6lq4KfA",
      badge: "Bestseller",
      badgeClass: "bg-[#817264]",
      altText: "A high-fashion minimalist product photograph of a delicate off-white silk eye mask resting on a bed of fresh jasmine petals."
    },
    {
      title: "Handloom Robe",
      price: "₹ 4,200",
      color: "Forest Moss",
      colorClass: "text-[#4c623d]",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCow09TyOP1xDEfcpC9fm0aQYifMQnbRSM2NvMxHjzO1XxdEUM0Al_rfCivbarn2HXTPZk5AALQkYCJerP56IgUYPGLLDersmfZI3PzmmvyWt-b_upsVccrTGVhaszruO-szxW5t-SOzNXCaFF3zR1oh01FxoLrCNsvxfJaYCP3A4UUQH29iOSsOe8HY5Sqg7vLNgogFrrJeX4-Nf3Ha9BAzI5nMejW4TujWpURfwSke--vSgungNO9sGD-8oTQCPcxSJW_kYIOCqI",
      altText: "A lifestyle product shot featuring a stack of premium Kerala handloom towels in varying shades of forest green and misty gray."
    },
    {
      title: "Cloud Linen Slippers",
      price: "₹ 1,890",
      color: "Petal Blush",
      colorClass: "text-[#865139]",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCDIDVOgo9yEzxlHCuLLuU-hMGBGyUmbw05H1rrwcE2-SZhVXHgOwiDVFNeYnru7qxQe3P1bOh0VwFADxz7v6JPTrz5z0EGV3dOR_BwuZeWbIP8dYMUh5PUntYLaK8QPRFH157BNuJBwONIw87uM3BvQ7QzGQsalNI-gdXo9bEtkPLMCzU76iDzYCvibm7qvCoJGKSaX0nAAPRWY1T9u5543a4j8bwSuvGfXOd3IR2oQbimK4lDUPeqAJ43_Wm7I2rnaD9YuYB-NBc",
      altText: "A minimalist studio photograph of a pair of soft linen slippers in a Petal Blush pink color."
    },
    {
      title: "Scented Ritual Kit",
      price: "₹ 2,100",
      color: "Deep Amber",
      colorClass: "text-[#675a4c]",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCBYSJCvob3nBoBYbeZPaAiGAnMCqWUXCIwHqHFde3uEB8m6M8qof7IABke6NvqBSu_x6iHlKdLhjcaEZCWGspLEfARaWcdMLmBUOyERywH-L6Jn3XBrUWTT-MVCE1eIfh3TnjucRoffHy6VAytYAqinZgbmBkEpqvbEvh9R01NcN3cUrFiHJwU_qQqp3gXh-LNGtHQWDqvIyHu32XgAhQX-nbzVpOJqcx_pwQeaS0WHBDQOYqKUxVbb6HEImAWRItOBfJ8jgAvS9A",
      altText: "An atmospheric detail shot of a ceramic candle holder and a small bottle of essential oil on a wooden nightstand."
    }
  ];
  return baseProducts[i % baseProducts.length];
});

export default function ProductGrid() {
  return (
    <div>
      <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 md:gap-x-8 gap-y-10 md:gap-y-12">
        {products.map((product, index) => (
          <ProductCard key={index} {...product} />
        ))}
      </section>
      <Pagination />
    </div>
  );
}
