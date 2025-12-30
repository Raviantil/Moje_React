import { Suspense } from "react";
import CategoryClient from "./CategoryClient";

import products from '../../../lib/products.json';

/* Group products by category for easy lookup */
const groupedProducts = products.reduce((acc, prod) => {
  const cat = prod.category || 'uncategorized';
  if (!acc[cat]) acc[cat] = [];
  acc[cat].push(prod);
  return acc;
}, {});

/* ✅ REQUIRED FOR NEXT.JS STATIC EXPORT */
export function generateStaticParams() {
  return Object.keys(groupedProducts).map((name) => ({
    name
  }));
} 

export default function Page({ params }) {
  const products = groupedProducts[params.name] || [];

  return (
    <Suspense fallback={<div className="p-10 text-center">Loading...</div>}>
      <CategoryClient name={params.name} products={products} />
    </Suspense>
  );
}
