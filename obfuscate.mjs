import { execSync } from "node:child_process";
import { readdirSync } from "node:fs";
import { join } from "node:path";

const DIST_DIR = "./dist";              // ajusta si tu salida es /dist/<app>
const APP_DIR = findAppDir(DIST_DIR);   // detecta carpeta real

const files = readdirSync(APP_DIR)
  .filter(f =>
    /\.js$/.test(f) &&
    !/^runtime\..*\.js$/.test(f) &&
    !/^polyfills(\..*)?\.js$/.test(f) &&
    !/^zone(\..*)?\.js$/.test(f)
  );

for (const f of files) {
  const inFile = join(APP_DIR, f);
  console.log(`Obfuscating ${f}`);
  execSync(`npx javascript-obfuscator "${inFile}" --config obfuscator.json --output "${inFile}"`, { stdio: "inherit" });
}

function findAppDir(root) {
  // dist/<app-name>
  const entries = readdirSync(root, { withFileTypes: true }).filter(d => d.isDirectory());
  if (entries.length === 1) return join(root, entries[0].name);
  // si ya es dist directo con .js, retorna root
  const hasJs = readdirSync(root).some(f => f.endsWith(".js"));
  return hasJs ? root : root;
}
