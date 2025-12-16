"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Fuse from "fuse.js";
import productList from "../lib/products.json"; // ✅ Make sure this file exists

const bannerImages = ["/banner1.jpg", "/banner2.jpg", "/banner3.jpg"];
const categories = [
  { name: "Winter", image: "/category-winter.jpg" },
  { name: "Sporty", image: "/category-sporty.jpg" },
  { name: "Comfort", image: "/category-comfort.jpg" }
];

// Initialize Fuse.js for fuzzy searching products
const fuse = new Fuse(productList, {
  keys: ["name", "category", "code"],
  threshold: 0.3, // adjust for fuzziness
  ignoreLocation: true,
});

export default function HomePage() {
  const [currentBanner, setCurrentBanner] = useState(0);
  const [query, setQuery] = useState("");
  const router = useRouter();

  // 🔄 Rotate banners every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % bannerImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // 🔍 Handle search (code / name / category) — fuzzy and case-insensitive
  const handleSearch = (e) => {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;

    // 1️⃣ Search products with Fuse
    const results = fuse.search(q);

    if (results.length > 0) {
      const product = results[0].item; // best match
      router.push(`${product.path}?highlight=${product.code}`);
      return;
    }

    // 2️⃣ Fuzzy search categories if no product found
    const categoryFuse = new Fuse(categories, {
      keys: ["name"],
      threshold: 0.3,
      ignoreLocation: true,
    });
    const catResults = categoryFuse.search(q);
    if (catResults.length > 0) {
      router.push(`/category/${catResults[0].item.name.toLowerCase()}`);
      return;
    }

    alert("No product found. Try code, name, or category.");
  };

  return (
    <div>
      {/* ===== Search Bar Section ===== */}
      <section className="w-full py-2 px-4 md:px-8 -mt-2">
        <form
          onSubmit={handleSearch} // ✅ handles both Enter and button click
          className="max-w-4xl mx-auto flex flex-col sm:flex-row gap-4 sm:gap-2 items-center justify-center"
        >
          <input
            type="text"
            placeholder="Search by product code, name, or category"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full sm:flex-1 p-3 rounded-md border border-gray-300 dark:border-gray-700
              bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
              focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
          />
          <button
            type="submit" // important for Enter key to work
            className="w-full sm:w-auto px-6 py-3 
             bg-black text-white 
             dark:bg-red-600 dark:text-white 
             rounded-md font-semibold 
             hover:bg-gray-900 dark:hover:bg-red-500 
             transition-colors duration-200"
          >
            Search
          </button>
        </form>
        <p className="mt-2 text-gray-600 dark:text-gray-400 text-sm text-center">
          Tip: Search by product code, name, or category (case and minor typos accepted).
        </p>
      </section>

      {/* ===== Banner Section ===== */}
      <div className="h-[60vh] relative overflow-hidden">
        <img
          src={bannerImages[currentBanner]}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
          alt="banner"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <h1 className="text-5xl text-white font-bold">Explore Moje Socks</h1>
        </div>
      </div>

      {/* ===== Categories Section ===== */}
      <section className="p-10">
        <h2 className="text-3xl font-semibold text-center mb-8">Categories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {categories.map((cat) => (
            <div
              key={cat.name}
              onClick={() => router.push(`/category/${cat.name.toLowerCase()}`)}
              className="cursor-pointer group overflow-hidden rounded-xl shadow-lg"
            >
              <img
                src={cat.image}
                className="w-full h-64 object-cover group-hover:scale-105 transition"
                alt={cat.name}
              />
              <div className="p-4 text-xl font-bold text-center bg-white dark:bg-gray-800 rounded-md">
                {cat.name}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
