// /app/components/Footer.jsx
"use client";
import { FaInstagram, FaXTwitter, FaPhone } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-[#E9E0E0] dark:bg-gray-900 text-gray-900 dark:text-white px-6 py-6 mt-15">
      <div className="max-w-7xl mx-auto relative">
        {/* Desktop layout */}
        <div className="hidden md:flex justify-between items-end">
          {/* Logo on bottom-left */}
          <div className="mb-2 md:mb-0">
          <img
            src="/logo.jpg"
            alt="Moje Logo"
            className="w-40 h-auto dark:hidden"
          />
          <img
            src="/logo3.jpg"
            alt="Moje Logo Dark"
            className="w-40 h-auto hidden dark:block"
          />
        </div>

          {/* Contact and social icons on bottom-right */}
          <div className="flex items-center space-x-6 mb-2 mr-2">
            <a href="tel:+919871391709" aria-label="Call">
              <FaPhone className="text-2xl hover:text-red-500 transition" />
            </a>
            <a
              href="https://www.instagram.com/sales.moje/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <FaInstagram className="text-2xl hover:text-red-500 transition" />
            </a>
            <a
              href="https://x.com/SalesMoje"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X (Twitter)"
            >
              <FaXTwitter className="text-2xl hover:text-red-500 transition" />
            </a>
          </div>
        </div>

        {/* Mobile layout (unchanged) */}
        <div className="flex md:hidden flex-col items-center space-y-4">
          <img
            src="/logo.jpg"
            alt="Moje Logo"
            className="w-24 h-auto dark:hidden"
          />
          <img
            src="/logo3.jpg"
            alt="Moje Logo Dark"
            className="w-24 h-auto hidden dark:block"
          />
          <div className="flex space-x-6">
            <a href="tel:+917497876966" aria-label="Call">
              <FaPhone className="text-xl hover:text-red-500 transition" />
            </a>
            <a
              href="https://www.instagram.com/sales.moje/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <FaInstagram className="text-xl hover:text-red-500 transition" />
            </a>
            <a
              href="https://x.com/SalesMoje"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X (Twitter)"
            >
              <FaXTwitter className="text-xl hover:text-red-500 transition" />
            </a>
          </div>
        </div>

        {/* Copyright line - always bottom */}
        <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-6">
          © {new Date().getFullYear()} Moje. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
