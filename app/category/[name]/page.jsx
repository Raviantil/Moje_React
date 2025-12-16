"use client";
import { useParams, useSearchParams } from "next/navigation";
import { useState, useEffect, useRef } from "react";

const dummyProducts = {
  winter: [
    { code: "MOJE123", name: "Cozy Wool", price: "₹349", description: "Soft wool socks for cold days.", image: "/socks1.jpg" },
    { code: "MOJE124", name: "Fuzzy Comfort", price: "₹399", description: "Fuzzy lining with heel support.", image: "/socks2.jpg" }
  ],
  sporty: [
    { code: "MOJE456", name: "Runner Grip", price: "₹299", description: "Sweat-wicking socks for running.", image: "/socks3.jpg" }
  ],
  comfort: [
    { code: "MOJE789", name: "Ultra Plush", price: "₹449", description: "Thick padded socks for ultimate comfort.", image: "/socks4.jpg" },
    { code: "MOJE790", name: "Everyday Ease", price: "₹299", description: "Lightweight and soft for daily wear.", image: "/socks5.jpg" }
  ]
};

export default function CategoryPage() {
  const { name } = useParams();
  const searchParams = useSearchParams();
  const highlightCode = searchParams.get("highlight"); // 🔹 get searched product code
  const products = name ? dummyProducts[name.toLowerCase()] || [] : [];
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Refs for each product div to scroll to
  const productRefs = useRef([]);

  // Scroll to highlighted product when page loads
  useEffect(() => {
    if (highlightCode && productRefs.current.length) {
      const index = products.findIndex(p => p.code === highlightCode);
      if (index !== -1 && productRefs.current[index]) {
        productRefs.current[index].scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }, [highlightCode, products]);

  return (
    <div className="p-10 min-h-screen bg-[#E9E0E0] dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-white">
      <h1 className="text-3xl font-bold mb-6 capitalize text-center drop-shadow-lg">
        {name || "Category"} Socks
      </h1>

      {products.length === 0 ? (
        <p className="text-red-300 text-center">No products found for category: {name}</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {products.map((product, i) => (
            <div
              key={i}
              ref={el => productRefs.current[i] = el} // 🔹 attach ref
              onClick={() => setSelectedProduct(product)}
              className={`group relative cursor-pointer transform transition-transform hover:scale-105 overflow-hidden rounded-xl shadow-xl
                ${highlightCode === product.code ? "ring-4 ring-red-600" : ""}`} // 🔹 highlight searched product
            >
              <img
                src={product.image}
                alt={product.name}
                className="object-cover w-full h-64 group-hover:brightness-75 transition duration-300"
              />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4">
                <h3 className="text-lg font-bold">{product.name}</h3>
                <p className="text-sm font-semibold text-gray-300">{product.price}</p>
                <p className="text-xs text-gray-400 mt-1">{product.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedProduct && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            className="relative bg-white/10 backdrop-blur-xl text-white rounded-xl overflow-hidden max-w-3xl w-full shadow-2xl transform scale-100 hover:scale-105 transition-transform duration-300"
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
              <h2 className="text-2xl font-bold mb-1">{selectedProduct.name}</h2>
              <p className="text-lg font-semibold">{selectedProduct.price}</p>
              <p className="text-sm text-gray-200 mt-2">{selectedProduct.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
