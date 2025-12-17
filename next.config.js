/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",

  basePath: "/Moje_React",
  assetPrefix: "/Moje_React/",

  trailingSlash: true,

  images: {
    unoptimized: true,
  },

  // Expose basePath at runtime so client components can prefix static public assets
  env: {
    NEXT_PUBLIC_BASE_PATH: "/Moje_React",
  },
};

module.exports = nextConfig;
