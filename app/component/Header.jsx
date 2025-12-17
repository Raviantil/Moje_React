"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

export default function Header() {
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const base = process.env.NEXT_PUBLIC_BASE_PATH || "";

  useEffect(() => {
    const stored = localStorage.getItem("darkMode");
    if (stored !== null) {
      setDarkMode(stored === "true");
      document.documentElement.classList.toggle("dark", stored === "true");
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur bg-white/30 dark:bg-black/30 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-10 flex items-center justify-between relative">

        {/* Left: Toggle button (on all screens) */}
        <div className="flex-1 flex justify-start">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="relative w-12 h-6 rounded-full bg-gray-300 dark:bg-gray-700 transition"
          >
            <span
              className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white dark:bg-black transition-transform ${
                darkMode ? "translate-x-6" : "translate-x-0"
              }`}
            />
          </button>
        </div>

        {/* Center: Logo (only one shows at a time) */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <Link href="/">
            <div className="relative w-74 h-auto">
              <img
                src={`${base}/logo.jpg`}
                alt="Moje Logo Light"
                className="block dark:hidden w-36 md:w-44 h-auto object-contain"
              />
              <img
                src={`${base}/logo3.jpg`}
                alt="Moje Logo Dark"
                className="hidden dark:block w-36 md:w-44 h-auto object-contain"
              />
            </div>
          </Link>
        </div>

        {/* Right: Desktop Nav + Mobile Hamburger */}
        <div className="flex-1 flex justify-end items-center">
          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-6">
            <Link
              href="/about"
              className="text-base md:text-lg font-semibold relative transition-colors duration-300 hover:text-red-500 after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-[2px] after:bottom-0 after:left-0 after:bg-red-500 after:origin-left hover:after:scale-x-100 after:transition-transform"
            >
              About Us
            </Link>
            <Link
              href="/contact"
              className="text-base md:text-lg font-semibold relative transition-colors duration-300 hover:text-red-500 after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-[2px] after:bottom-0 after:left-0 after:bg-red-500 after:origin-left hover:after:scale-x-100 after:transition-transform"
            >
              Contact Us
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-2xl text-gray-800 dark:text-white focus:outline-none"
            >
              {menuOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-white/90 dark:bg-black/90 text-center py-4 space-y-4">
          <Link
            href="/about"
            className="block text-lg font-semibold hover:text-red-500 transition"
            onClick={() => setMenuOpen(false)}
          >
            About Us
          </Link>
          <Link
            href="/contact"
            className="block text-lg font-semibold hover:text-red-500 transition"
            onClick={() => setMenuOpen(false)}
          >
            Contact Us
          </Link>
        </div>
      )}
    </header>
  );
}
