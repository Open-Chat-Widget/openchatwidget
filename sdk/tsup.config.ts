import { defineConfig } from "tsup";

export default defineConfig({
  entry: { index: "widget/src/index.ts" },
  format: ["esm"],
  dts: true,
  sourcemap: true,
  target: "es2022",
  outDir: "dist",
});
