"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect, useRef } from "react";

export default function CategoryClient({ name, products }) {
  const searchParams = useSearchParams();
  const highlightCode = searchParams.get("highlight");

  const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const withBase = (p) => `${base}${p}`;

  const [selectedProduct, setSelectedProduct] = useState(null);
  const productRefs = useRef([]);

  useEffect(() => {
    if (highlightCode) {
      const index = products.findIndex(p => p.code === highlightCode);
      if (index !== -1 && productRefs.current[index]) {
        productRefs.current[index].scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }, [highlightCode, products]);

  return (
    <div className="p-10 min-h-screen bg-[#E9E0E0]">
      <h1 className="text-3xl font-bold text-center capitalize mb-6">
        {name} Socks
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((product, i) => (
          <div
            key={i}
            ref={el => (productRefs.current[i] = el)}
            onClick={() => setSelectedProduct(product)}
            className={`cursor-pointer rounded-xl shadow-xl hover:scale-105 transition
              ${highlightCode === product.code ? "ring-4 ring-red-600" : ""}`}
          >
            <img src={withBase(product.image)} className="w-full h-64 object-cover" />
          </div>
        ))}
      </div>

      {selectedProduct && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center"
          onClick={() => setSelectedProduct(null)}
        >
          <div className="bg-black p-6 rounded-xl">
            <img src={withBase(selectedProduct.image)} className="h-80 object-cover" />
            <h2 className="text-xl mt-4">{selectedProduct.name}</h2>
            <p>{selectedProduct.price}</p>
          </div>
        </div>
      )}
    </div>
  );
}
