import ProductCard from "../../client/product/ProductCard";
import Link from "next/link";

const products = [
  {
    title: "Ayah Linen Gown",
    price: "₹ 4,800",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBwzG45fYOwTXExYBOZTiUAgf7h6TVDaOD6p1PA8l814zOLPvAQPJzC07NFQK4IFlsXlGsrRVZBAKFqcSTzkgRmLuaCY1FnogPXqkjOOLclOf7zPXaWyJrr3op1849O0W9AYeznvKmW2HXqdZX1Vrus-5TwNQocDkitrUwc6-6-vJp2aFJCcXC5uw4RvjXY9EFKwknQHyGln3OBHd_Fa-vlifrpoY8cISVLUfusETjsObx6Ooyz3qYPyoYPzrPFnveohDxqpy3OPCs",
    altText: "A minimalist product shot of a premium cream-colored linen nightgown...",
  },
  {
    title: "Veda Lounge Set",
    price: "₹ 5,200",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD-54u5ezfJTLiDrcFP1KxxssWq_LLEVtZENUHGNx_TDZVmGQYM532jyBOerVBcyYNrbBbyVwbr9mya_SCKJQJYGLeOotL5uW-1a4cEuS29SXmqaISF8V3QVLB9E_LBGaTXtsl3GJmfoDOZKB7eLgEFt8X6iR1Ms7MAVQcJxpeOB2FchcRSYfY3jreRdH5RjlL2_TIEVz678ggbR2BqqdZU1v0v6a4eagXfdIYwwfwSGRgwa6xf5PuwjOxmqY4WqN_VKg5yWL84JAY",
    altText: "Close-up detail of a dark forest green lounge set...",
  },
  {
    title: "Marari Robe",
    price: "₹ 3,900",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAiY9whrl58OogXh6agDOYp8IbyTFKjg_iXEqtI5tuyBn08Afh6EQu1FPm1n1N86iRJprxZUEXWPhTz-4ckT-wjGOF1q3HtYtiE0I8ymEpuT-T6zGKmYvLjeBt-QrqEiE3jCyhSk1rgUqZ2GYBbpyY_huZsQ6YiwKR6cqwkAHFSRaVsrMensNtH0oJtdUHMTLxJM71KGw8MJKMb9hC5saeRxm1wIMquwyTX8xHwoIv8-UVx59IhaE5IVjwaccJjC8UVPV0OQ7KhvPI",
    altText: "An editorial shot of a woman sitting on a vintage wooden chair...",
  },
  {
    title: "Idukki Night Set",
    price: "₹ 4,500",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAdt-CfkcGXcTR0m7iIgZvINyv03rIMaAeMI4Z0p2dZCHVRuscbj6Uzp4dxQ2_VXwwBDULQlJ3L91JyQG30t4VY5FYyNkt_gnXWrhxQjNUxOatVFOBXtvNWgMcfd7c1C1ZGtqsk8-GPPRkMMUP7U_ck82GbDAPnKi2ypE7LhWVw_OPt2qT6VcsQVlpZ_FrPbeJJEsbuQ9Bt-5z4m2K1wvzxYvKrxBt5KuPMH1FmWkcbLJgzBjyg4fvKPonmjcX0_Sy9vRnn4KvbRsE",
    altText: "A top-down aesthetic flatlay of a white nightwear set...",
  },
  {
    title: "Munnar Silk Slip",
    price: "₹ 5,800",
    imageUrl:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80",
    altText: "A silk slip dress on a wooden hanger...",
  },
  {
    title: "Kochi Wrap Dress",
    price: "₹ 4,200",
    imageUrl:
      "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=800&q=80",
    altText: "Woman wearing a comfortable wrap dress...",
  },
  {
    title: "Alleppey Cotton Pyjama",
    price: "₹ 3,500",
    imageUrl:
      "https://images.unsplash.com/photo-1551232864-3f0890e580d9?w=800&q=80",
    altText: "Soft cotton pyjama set...",
  },
  {
    title: "Wayanad Lounge Pants",
    price: "₹ 2,900",
    imageUrl:
      "https://images.unsplash.com/photo-1542272604-780c8d4889c2?w=800&q=80",
    altText: "Comfortable lounge pants...",
  },
];

export default function CollectionsGrid() {
  return (
    <section className="px-margin-mobile pt-2 pb-10 space-y-8 bg-background">
      <div className="flex justify-between items-end">
        <h3 className="cormorant text-3xl text-primary-dark italic">Latest Collections</h3>
        <Link href="/collections" className="text-secondary font-label-sm border-b border-secondary pb-1">
          View All
        </Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-10">
        {products.map((product, i) => (
          <ProductCard key={i} {...product} />
        ))}
      </div>
    </section>
  );
}
