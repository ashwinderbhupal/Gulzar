import type { NextConfig } from "next";

// For GitHub Pages: set NEXT_PUBLIC_BASE_PATH=/repo-name in your environment
// Leave empty for root domain or custom domain deployments
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  output: "export",
  basePath: basePath || undefined,
  assetPrefix: basePath || undefined,
  images: { unoptimized: true },
};

export default nextConfig;
