"use client";
import { useState } from "react";

export default function ContactPage() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [error, setError] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(false);

    const formData = new FormData(e.target);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        setFormSubmitted(true);
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    }
  }

  return (
    <div className="min-h-screen bg-[#E9E0E0] dark:bg-gray-900 px-4 py-10 text-gray-900 dark:text-white">
      <div className="max-w-2xl mx-auto bg-white/60 dark:bg-white/10 backdrop-blur-md p-8 rounded-xl shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-center">Contact Us</h1>

        {formSubmitted ? (
          <p className="text-center text-green-500 font-medium">
            ✅ Message sent successfully! We’ll get back to you soon.
          </p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            {/* REQUIRED */}
            <input
              type="hidden"
              name="access_key"
              value="64fc5a70-884d-4a61-86cb-246d5f377f3c"
            />

            {/* IMPORTANT FOR EMAIL DELIVERY */}
            <input type="hidden" name="subject" value="New Contact Message" />
            <input type="hidden" name="from_name" value="Moje Website" />

            <div>
              <label className="block text-sm mb-1">Name</label>
              <input
                type="text"
                name="name"
                required
                placeholder="Your name"
                className="w-full px-4 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Email</label>
              <input
                type="email"
                name="email"
                required
                placeholder="your@email.com"
                className="w-full px-4 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Your Message</label>
              <textarea
                name="message"
                rows="5"
                required
                placeholder="Write your message here..."
                className="w-full px-4 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
              ></textarea>
            </div>

            {error && (
              <p className="text-center text-red-500 font-medium">
                ❌ Failed to send message. Please try again.
              </p>
            )}

            <button
              type="submit"
              className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg font-semibold transition-colors"
            >
              Send Message
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
