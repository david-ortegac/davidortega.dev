import { execSync } from "node:child_process";
import { readdirSync } from "node:fs";
import { join } from "node:path";

const DIST_DIR = "./dist/browser"; 

console.log(`🚀 Iniciando ofuscación en: ${DIST_DIR}`);

function getFilesRecursively(dir) {
  const entries = readdirSync(dir, { withFileTypes: true });
  const files = entries
    .filter(entry => entry.isFile() && entry.name.endsWith('.js'))
    .filter(entry => {
      const f = entry.name;
      // PROTECCIÓN CRÍTICA: No tocar archivos base de Angular/System
      const isBaseFile = /^runtime|^polyfills|^zone|^vendor/.test(f);
      // No tocar el main.js de la plantilla (evita errores de classList)
      const isTemplateMain = f === 'main.js';
      
      return !isBaseFile && !isTemplateMain;
    })
    .map(entry => join(dir, entry.name));

  const subdirs = entries.filter(entry => entry.isDirectory());
  for (const subdir of subdirs) {
    if (subdir.name === 'vendor') continue;
    files.push(...getFilesRecursively(join(dir, subdir.name)));
  }
  return files;
}

if (readdirSync("./dist").includes("browser")) {
  const allFiles = getFilesRecursively(DIST_DIR);
  
  for (const inFile of allFiles) {
    console.log(`  🔒 Ofuscando: ${inFile}`);
    try {
      execSync(`npx javascript-obfuscator "${inFile}" --config obfuscator.json --output "${inFile}"`, { stdio: "inherit" });
    } catch (error) {
      console.error(`  ❌ Error en ${inFile}`);
    }
  }
  console.log("✅ Proceso finalizado");
} else {
  console.error("❌ Error: No se encontró la carpeta dist/browser");
}
