"use client";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#E9E0E0] dark:bg-gradient-to-b dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-gray-100 px-6 py-16">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6">About Moje</h1>
        <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-12">
          At <span className="text-red-600 font-semibold">Moje</span>, we don’t just make socks — we make a statement.
          Socks are often overlooked, under-designed, and treated as an afterthought. But we saw them differently.
          We believe socks deserve more. More care. More craft. More character.
          That’s why we create socks that combine precision fit, premium materials, and refined aesthetics —
          for those who notice the details and wear them with pride.
        </p>

        <div className="grid md:grid-cols-2 gap-10 items-center">
          <Image
            src="/about_page_image.jpg"
            alt="About Moje"
            width={500}
            height={400}
            className="rounded-xl shadow-lg object-cover w-full"
          />
          <div className="text-left space-y-5">
            <h2 className="text-2xl font-bold">What Makes Us Unique?</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
              <li>
                <span className="font-medium text-red-600">Tailored Fit:</span> Designed to hug your feet with the perfect balance of support and stretch — no sagging, no slipping.
              </li>
              <li>
                <span className="font-medium text-red-600">Premium Materials:</span> We use only carefully selected cotton, merino wool, and eco-conscious blends that feel as good as they look.
              </li>
              <li>
                <span className="font-medium text-red-600">Minimal, Modern Aesthe
                  tics:</span> Subtle designs that complement every style — from streetwear to smart casual.
              </li>
              <li>
                <span className="font-medium text-red-600">Obsessive Craftsmanship:</span> Every seam, thread, and pattern is tested for durability, comfort, and long-lasting quality.
              </li>
            </ul>

          </div>
        </div>

        <div className="mt-20 text-center">
          <h2 className="text-3xl font-bold mb-4">Join the Moje Movement</h2>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Moje was born from a simple realization: no one really cares about socks — not in the way they should.
            We set out to change that. Every pair we make is thoughtfully designed to deliver comfort that lasts,
            style that stands out, and quality you can feel from the first step.
            Whether you’re lounging at home, heading to the gym, or out to make a statement —
            Moje is your perfect companion. Thank you for being a part of our journey.
          </p>
        </div>
      </div>
    </div>
  );
}

