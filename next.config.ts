import type { NextConfig } from "next";
import path from "node:path";

const repoName = "molham_portfolio";

const nextConfig: NextConfig = {
  output: "export",
  basePath: `/${repoName}`,
  assetPrefix: `/${repoName}/`,
  images: {
    unoptimized: true,
  },
  // The repo root has a placeholder package-lock.json; pin tracing to
  // this directory to silence the "multiple lockfiles" warning.
  outputFileTracingRoot: path.join(process.cwd()),
};

export default nextConfig;