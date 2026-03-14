import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import type { NextConfig } from "next";

const rootDir = dirname(fileURLToPath(import.meta.url));
const workspaceRoot = dirname(dirname(rootDir));

const nextConfig: NextConfig = {
  transpilePackages: ["@openchatwidget/sdk"],
  turbopack: {
    root: workspaceRoot,
  },
};

export default nextConfig;
