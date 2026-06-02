import type { NextConfig } from "next";

// On GitHub Pages a project site is served from a subpath (e.g. /breezeai-marketing-site).
// CI sets PAGES_BASE_PATH to "/<repo-name>" so this auto-matches the repo (and survives renames);
// it's empty locally and for root/custom-domain deploys.
const basePath = process.env.PAGES_BASE_PATH || "";

const nextConfig: NextConfig = {
  output: 'export',          // emit a fully static site into ./out (no Node server)
  trailingSlash: true,       // emit /user-guide/index.html so GitHub Pages serves it at /user-guide/
  images: { unoptimized: true }, // default image optimizer needs a server; serve images as-is
  basePath: basePath || undefined,
  assetPrefix: basePath || undefined,
  env: { NEXT_PUBLIC_BASE_PATH: basePath }, // expose to app code for plain-string asset paths
};

export default nextConfig;
