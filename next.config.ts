import type { NextConfig } from "next";

// PAGES_BASE_PATH is set only by the GitHub Pages CI build (e.g. "/breeze-ai").
// When it's present we emit a static export under that subpath (what GitHub Pages serves).
// When it's absent — i.e. locally — this stays a normal Next.js app, so `next dev` AND
// `next start` both work with no extra flags.
const basePath = process.env.PAGES_BASE_PATH || "";
const isPagesBuild = basePath.length > 0;

const nextConfig: NextConfig = {
  trailingSlash: true, // GitHub Pages serves /path/ as /path/index.html
  env: { NEXT_PUBLIC_BASE_PATH: basePath }, // exposed to app code for plain-string asset paths
  ...(isPagesBuild
    ? {
        output: "export",            // static HTML/JS/CSS into ./out, no Node server
        images: { unoptimized: true }, // the default image optimizer needs a server
        basePath,
        assetPrefix: basePath,
      }
    : {}),
};

export default nextConfig;
