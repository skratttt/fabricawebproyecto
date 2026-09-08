import { cpSync, mkdirSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";

const require = createRequire(import.meta.url);
const source = dirname(require.resolve("pdfjs-dist/package.json"));
// Keep fonts, character maps, colour profiles and image decoders on our own domain.
for (const directory of ["cmaps", "standard_fonts", "iccs", "wasm"]) {
  const destination = join("public", "pdf-assets", directory);
  mkdirSync(destination, { recursive: true });
  cpSync(join(source, directory), destination, { recursive: true });
}
