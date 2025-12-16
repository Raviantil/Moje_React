// /app/layout.jsx
import "../styles/globals.css";
import Header from "./component/Header";
import Footer from "./component/Footer";
import BackToTopButton from "./component/BackToTopButton";

export const metadata = {
  title: "Moje",
  description: "Stylish and comfortable socks for every occasion",
  icons: {
    icon: "/favicon_io/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="transition-colors duration-300 bg-[#E9E0E0] text-gray-900 dark:bg-gray-900 dark:text-white">
        <Header />
        {/* Reduced top padding so search bar sits closer to header */}
        <main className="min-h-screen pt-4 md:pt-6">{children}</main>
        <Footer />
        <BackToTopButton />
      </body>
    </html>
  );
}
