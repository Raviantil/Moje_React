import { Suspense } from "react";
import CategoryClient from "./CategoryClient";

const dummyProducts = {
  winter: [
    {
      code: "MOJE123",
      name: "Cozy Wool",
      price: "₹349",
      description: "Soft wool socks for cold days.",
      image: "/socks1.jpg"
    },
    {
      code: "MOJE124",
      name: "Fuzzy Comfort",
      price: "₹399",
      description: "Fuzzy lining with heel support.",
      image: "/socks2.jpg"
    }
  ],
  sporty: [
    {
      code: "MOJE456",
      name: "Runner Grip",
      price: "₹299",
      description: "Sweat-wicking socks for running.",
      image: "/socks3.jpg"
    }
  ],
  comfort: [
    {
      code: "MOJE789",
      name: "Ultra Plush",
      price: "₹449",
      description: "Thick padded socks for ultimate comfort.",
      image: "/socks4.jpg"
    },
    {
      code: "MOJE790",
      name: "Everyday Ease",
      price: "₹299",
      description: "Lightweight and soft for daily wear.",
      image: "/socks5.jpg"
    }
  ]
};

/* ✅ REQUIRED FOR NEXT.JS STATIC EXPORT */
export function generateStaticParams() {
  return Object.keys(dummyProducts).map((name) => ({
    name
  }));
}

export default function Page({ params }) {
  const products = dummyProducts[params.name] || [];

  return (
    <Suspense fallback={<div className="p-10 text-center">Loading...</div>}>
      <CategoryClient name={params.name} products={products} />
    </Suspense>
  );
}
