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
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") setSelectedProduct(product);
            }}
            className={`group relative cursor-pointer rounded-xl overflow-hidden shadow-xl transition-transform duration-200
              ${highlightCode === product.code ? "ring-4 ring-red-600" : ""}`}
          >
            <img
              src={withBase(product.image)}
              alt={product.name}
              className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-200"
            />

            {/* Hover overlay showing name, price and description */}
            <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity duration-200 text-white">
              <div className="text-sm font-semibold">{product.name}</div>
              <div className="text-lg font-bold">{product.price}</div>
              <div className="text-xs truncate">{product.description}</div>
            </div>
          </div>
        ))}
      </div>

      {selectedProduct && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            className="relative bg-white/10 backdrop-blur-xl text-white rounded-xl overflow-hidden max-w-3xl w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 text-white bg-black/60 hover:bg-black/80 p-2 rounded-full z-10"
            >
              ✕
            </button>

            <img
              src={selectedProduct.image}
              alt={selectedProduct.name}
              className="w-full h-[28rem] object-cover"
            />

            <div className="p-6 bg-gradient-to-t from-black/70 to-transparent">
              <h2 className="text-2xl font-bold mb-1">
                {selectedProduct.name}
              </h2>
              <p className="text-lg font-semibold">
                {selectedProduct.price}
              </p>
              <p className="text-sm text-gray-200 mt-2">
                {selectedProduct.description}
              </p>

              {/* BUY BUTTONS */}
              <div className="flex gap-4 mt-4">
                {selectedProduct.amazonLink && (
                  <a
                    href={selectedProduct.amazonLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-yellow-400 text-black px-5 py-2 rounded-lg font-semibold hover:bg-yellow-500"
                  >
                    Buy on Amazon
                  </a>
                )}

                {selectedProduct.flipkartLink && (
                  <a
                    href={selectedProduct.flipkartLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-blue-700"
                  >
                    Buy on Flipkart
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
