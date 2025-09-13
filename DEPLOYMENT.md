# David Ortega Dev - Deployment Guide

## Problemas Solucionados

Los errores que estabas experimentando se debían a:

1. **Archivos no encontrados**: La aplicación intentaba cargar archivos desde rutas incorrectas
2. **Errores CORS**: La aplicación se estaba abriendo directamente desde el sistema de archivos en lugar de ser servida por un servidor HTTP
3. **Rutas de assets incorrectas**: Los paths relativos no coincidían con la estructura de build de Angular

## Cómo Ejecutar la Aplicación

### Para Desarrollo

```bash
# Instalar dependencias
npm install

# Ejecutar servidor de desarrollo
npm start
# o
ng serve

# La aplicación estará disponible en http://localhost:4200
```

### Para Producción

```bash
# Construir la aplicación
npm run build:dev
# o para producción con obfuscación
npm run build

# Servir los archivos construidos
npm run serve

# La aplicación estará disponible en http://localhost:8080
```

## Cambios Realizados

1. **Corregidas las rutas de assets** en `src/index.html`:
   - Removido el script manual `./js/main.js` (Angular CLI lo inyecta automáticamente)
   - Corregidas las rutas de favicon e íconos

2. **Agregado servidor personalizado** (`serve.js`):
   - Sirve archivos estáticos correctamente
   - Maneja el routing de SPA
   - Soporte para todos los tipos MIME necesarios

3. **Nuevos scripts en package.json**:
   - `npm run serve`: Sirve la aplicación construida
   - `npm run build:dev`: Build de desarrollo sin obfuscación

## Notas Importantes

- **Nunca abras `index.html` directamente** desde el explorador de archivos
- **Siempre usa un servidor HTTP** (ya sea `ng serve` para desarrollo o `npm run serve` para producción)
- Los archivos de build se generan en `dist/browser/`
- La aplicación está configurada como SPA (Single Page Application) con routing del lado cliente

## Estructura de Archivos

```
dist/browser/
├── index.html          # Archivo principal
├── main.js            # Código Angular compilado
├── polyfills.js       # Polyfills de Angular
├── styles.css         # Estilos compilados
├── img/               # Assets de imágenes
├── js/                # Scripts adicionales
└── vendor/            # Librerías de terceros
```