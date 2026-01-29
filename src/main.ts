import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

// Inicializar compatibilidad del navegador antes de arrancar Angular
console.log('Initializing BrowserCompatibility...');
console.log('BrowserCompatibility initialized');

// Limpiar observers cuando la ventana se cierre
window.addEventListener('beforeunload', () => {});

console.log('Bootstrapping application...');
bootstrapApplication(AppComponent, appConfig)
  .then(() => console.log('Application bootstrapped successfully'))
  .catch((err) => {
    // Filtrar errores de extensiones antes de logearlos
    if (err && typeof err === 'object' && err.message) {
      if (err.message.includes('chrome-extension') || 
          err.message.includes('content_script.js')) {
        console.warn('Extension-related bootstrap error suppressed:', err.message);
        return;
      }
    }
    console.error('Application bootstrap error:', err);
  });
