/** @type {import('next').NextConfig} */

// For custom domains (e.g. https://www.moje.in) the site is served from the root ("/").
// For GitHub Project Pages (e.g. https://<user>.github.io/<repo>/) you need a basePath.
//
// Build examples:
//   Custom domain (root): npm run deploy
//   GitHub project path:  set BASE_PATH=/Moje_React && npm run deploy
const basePath = process.env.BASE_PATH || "";

const nextConfig = {
  output: "export",

  basePath,
  assetPrefix: basePath ? `${basePath}/` : "",

  trailingSlash: true,

  images: {
    unoptimized: true,
  },

  // Expose basePath at runtime so client components can prefix static public assets
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

module.exports = nextConfig;
