import { existsSync, renameSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, "../dist");
const styleCssPath = path.join(distDir, "style.css");
const indexCssPath = path.join(distDir, "index.css");
const indexJsPath = path.join(distDir, "index.js");

if (existsSync(styleCssPath)) {
  renameSync(styleCssPath, indexCssPath);
}

if (existsSync(indexJsPath)) {
  const currentCode = readFileSync(indexJsPath, "utf8");
  const cssImport = 'import "./index.css";\n';

  if (!currentCode.startsWith(cssImport)) {
    writeFileSync(indexJsPath, `${cssImport}${currentCode}`);
  }
}
