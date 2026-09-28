import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const distDir = path.resolve('dist');
const zipFile = path.join(distDir, 'lambda.zip');
const entryFile = path.join(distDir, 'index.js');

if (!fs.existsSync(entryFile)) {
  console.error('❌ Error: No se encontró dist/index.js. Asegúrate de ejecutar el bundle primero.');
  process.exit(1);
}

// Eliminar zip anterior si existe
if (fs.existsSync(zipFile)) {
  fs.unlinkSync(zipFile);
}

console.log('📦 Empaquetando lambda.zip...');

try {
  // Intentar con bsdtar (estándar en Arch/CachyOS y Linux moderno)
  try {
    execSync(`bsdtar -acf "${zipFile}" -C "${distDir}" index.js`, { stdio: 'inherit' });
    console.log(`✅ Archivo listo para AWS Lambda: ${zipFile}`);
    process.exit(0);
  } catch {
    // Si no está bsdtar, intentar con zip estándar
    execSync(`zip -j "${zipFile}" "${entryFile}"`, { stdio: 'inherit' });
    console.log(`✅ Archivo listo para AWS Lambda: ${zipFile}`);
    process.exit(0);
  }
} catch (err) {
  console.warn('⚠️ No se encontró bsdtar ni zip en el sistema.');
  console.log(`ℹ️ Puedes subir directamente el archivo transpiliado: ${entryFile}`);
}
