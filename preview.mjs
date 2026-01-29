import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST_DIR = path.join(__dirname, 'dist', 'browser');
const DEFAULT_PORT = 5000;

const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
};

function serve(port) {
  const server = http.createServer((req, res) => {
    // Limpiar la URL de parámetros de consulta
    const url = req.url.split('?')[0];
    let filePath = path.join(DIST_DIR, url === '/' ? 'index.html' : url);

    // Soporte para SPA: Si el archivo no existe y no tiene extensión, servimos index.html
    if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
      if (!path.extname(url)) {
        filePath = path.join(DIST_DIR, 'index.html');
      } else {
        res.writeHead(404);
        res.end('404: Not Found');
        return;
      }
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    fs.readFile(filePath, (err, content) => {
      if (err) {
        res.writeHead(500);
        res.end(`Server Error: ${err.code}`);
      } else {
        res.writeHead(200, { 
          'Content-Type': contentType,
          'Cache-Control': 'no-cache',
          'X-Content-Type-Options': 'nosniff'
        });
        res.end(content);
      }
    });
  });

  server.on('error', (e) => {
    if (e.code === 'EADDRINUSE') {
      console.log(`Port ${port} in use, trying ${port + 1}...`);
      serve(port + 1);
    } else {
      console.error('Server error:', e);
    }
  });

  server.listen(port, '127.0.0.1', () => {
    console.log('\n🚀 Servidor de pruebas local iniciado');
    console.log(`📂 Sirviendo desde: ${DIST_DIR}`);
    console.log(`🔗 URL: http://127.0.0.1:${port}\n`);
    console.log('Presiona Ctrl+C para detener el servidor');
  });
}

if (!fs.existsSync(DIST_DIR)) {
  console.error(`❌ Error: La carpeta ${DIST_DIR} no existe.`);
  console.log('Ejecuta "npm run build:prod" primero.');
} else {
  serve(DEFAULT_PORT);
}
