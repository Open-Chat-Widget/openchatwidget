import { defineConfig } from "tsup";

export default defineConfig([
  {
    entry: { index: "widget/src/index.ts" },
    format: ["esm"],
    dts: true,
    sourcemap: true,
    target: "es2022",
    outDir: "dist",
    noExternal: ["react", "react-dom", "react-markdown", "remark-gfm"],
  },
  {
    entry: { "server/index": "widget/server/index.ts" },
    format: ["esm"],
    dts: true,
    sourcemap: true,
    target: "es2022",
    outDir: "dist",
    platform: "node",
    noExternal: ["express", "cors", "dotenv"],
  },
]);
