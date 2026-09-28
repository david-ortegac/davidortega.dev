# 🚀 DavidOrtega.dev — Portafolio Profesional & Sitio Web

Sitio web personal y portafolio profesional de **David Ortega**, Ingeniero de Software Full-Stack (Master en Ingeniería de Software). Desarrollado con **Angular 22**, arquitectura orientada a componentes independientes (*standalone components*), optimización avanzada para Core Web Vitals, integración con Cloudflare Workers y despliegue continuo mediante GitHub Actions.

[![Angular](https://img.shields.io/badge/Angular-22+-DD0031?style=for-the-badge&logo=angular&logoColor=white)](https://angular.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Cloudflare](https://img.shields.io/badge/Cloudflare_Workers-F38020?style=for-the-badge&logo=cloudflare&logoColor=white)](https://workers.cloudflare.com/)
[![Node.js](https://img.shields.io/badge/Node.js-24-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![License](https://img.shields.io/badge/License-Private-blue?style=for-the-badge)](LICENSE)

---

## 📋 Tabla de Contenidos

- [Características Principales](#-características-principales)
- [Stack Tecnológico](#-stack-tecnológico)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Requisitos Previos](#-requisitos-previos)
- [Instalación y Configuración Local](#-instalación-y-configuración-local)
- [Variables de Entorno](#-variables-de-entorno)
- [Scripts Disponibles](#-scripts-disponibles)
- [Flujo de Despliegue y CI/CD](#-flujo-de-despliegue-y-cicd)
- [Seguridad y Optimización](#-seguridad-y-optimización)
- [Contacto](#-contacto)

---

## ✨ Características Principales

- **Arquitectura Standalone Moderna:** Implementado con componentes autónomos de Angular 22, flujo de control `@if`/`@for` y directivas `@defer` para carga bajo demanda según visibilidad del viewport.
- **Portafolio Interactivo:** Filtrado dinámico de proyectos por categorías (Web, Mobile, Backend y Académicos) con vista modal de detalles (Glightbox).
- **Métricas de Código en Tiempo Real:** Integración con la API y badges de WakaTime para exhibir estadísticas de desarrollo y lenguajes utilizados.
- **Cotizador & Mensajería Directa por WhatsApp:** Formulario reactivo tipado que valida requerimientos y genera automáticamente mensajes preformateados directos a WhatsApp por categoría.
- **Sección de Tutoriales & YouTube:** Consumo e integración con la API de YouTube para listar contenido educativo y técnico.
- **Optimización SEO & Core Web Vitals:** Etiquetas Open Graph, Twitter Cards, imágenes en WebP con directiva `ngSrc`, y minimización de cambios de diseño acumulados (CLS).
- **Ofuscación de Código en Producción:** Pipeline de build integrado con `javascript-obfuscator` para protección de activos en producción.

---

## 🛠️ Stack Tecnológico

| Capa | Tecnología |
| :--- | :--- |
| **Framework Frontend** | [Angular 22](https://angular.dev/) (Standalone Components, Signals, Deferrable Views) |
| **Lenguaje** | [TypeScript](https://www.typescriptlang.org/) (Strict Mode) |
| **Estilos & UI** | SCSS modular, Bootstrap 5.3 utilities, Bootstrap Icons |
| **Librerías de Soporte** | Swiper, Glightbox, AOS (Animate on Scroll), Isotope Layout |
| **Build & Tooling** | Angular Build (`@angular/build`), esbuild, `javascript-obfuscator` |
| **Hosting & CDN** | [Cloudflare Workers / Pages](https://workers.cloudflare.com/) (Assets estáticos vía Wrangler) |
| **CI/CD** | GitHub Actions |

---

## 📁 Estructura del Proyecto

```text
davidortega.dev/
├── .github/
│   └── workflows/
│       └── deploy.yml          # Pipeline CI/CD para Cloudflare Workers
├── src/
│   ├── app/
│   │   ├── assets/styles/      # Variables SCSS, mixins, layouts y estilos por sección
│   │   ├── components/
│   │   │   ├── base/           # Header, Footer y layouts compartidos
│   │   │   ├── external/       # Componentes de integración externa (Tutoriales/YouTube)
│   │   │   ├── main/           # Secciones principales (Hero, About, Services, Steps,
│   │   │   │                   # Portfolio, Pricing, FAQ, Contact)
│   │   │   ├── pages/          # Páginas estáticas (Política de Privacidad)
│   │   │   └── shared/         # Componentes reutilizables (Botón WhatsApp, AdSense)
│   │   ├── config/             # Configuraciones de Analytics y SEO
│   │   ├── directives/         # Directivas personalizadas (Lazy Loading, etc.)
│   │   ├── models/             # Interfaces TypeScript y modelos de datos
│   │   ├── services/           # Servicios (YouTube, SEO, Analytics, Firestore)
│   │   ├── app.config.ts       # Configuración global de la aplicación y proveedores
│   │   └── app.routes.ts       # Definición de rutas
│   ├── environments/           # Variables de entorno por ambiente
│   ├── index.html              # Plantilla base HTML con metadatos SEO
│   ├── main.ts                 # Punto de entrada de la aplicación
│   └── styles.scss             # Estilos globales y optimizaciones de renderizado
├── lambda/                     # Funciones serverless backend auxiliares
├── obfuscate.mjs               # Script de ofuscación de código post-build
├── preview.mjs                 # Servidor local de previsualización
├── wrangler.toml               # Configuración de despliegue en Cloudflare Workers
└── package.json                # Dependencias y scripts de ejecución
```

---

## 📦 Requisitos Previos

Asegúrate de contar con el siguiente entorno antes de iniciar:

- **Node.js:** Versión 20.x o 24.x (LTS recomendado).
- **npm:** Versión 10+
- **Angular CLI:** (Opcional para comandos globales `ng`):
  ```bash
  npm install -g @angular/cli
  ```

---

## ⚙️ Instalación y Configuración Local

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/david-ortegac/davidortega.dev.git
   cd davidortega.dev
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Configurar las variables de entorno:**
   Crea un archivo `.env` en la raíz del proyecto para las claves de API (por ejemplo, YouTube API):
   ```env
   API_KEY=tu_api_key_de_youtube
   CHANNEL_ID=tu_channel_id_de_youtube
   ```

4. **Iniciar el servidor de desarrollo:**
   ```bash
   npm start
   ```
   Abre [http://localhost:4200/](http://localhost:4200/) en tu navegador. El servidor cuenta con recarga automática (*hot reload*).

---

## 📜 Scripts Disponibles

| Comando | Descripción |
| :--- | :--- |
| `npm start` | Inicia el servidor de desarrollo en `http://localhost:4200/`. |
| `npm run build:dev` | Genera un build de desarrollo sin minificación para depuración. |
| `npm run build:prod` | Compila la aplicación optimizada para producción en `dist/browser`. |
| `npm run build:prod:obf` | Compila en modo producción y ejecuta la ofuscación de código. |
| `npm run obfuscate` | Ofusca los bundles JavaScript generados en el directorio `dist/`. |
| `npm run test` | Ejecuta las pruebas unitarias mediante Karma y Jasmine. |
| `npm run preview` | Inicia un servidor local ligero para previsualizar el build de producción. |
| `npm run deploy` | Compila en producción y despliega directamente a Cloudflare Workers vía Wrangler. |

---

## 🚢 Flujo de Despliegue y CI/CD

El proyecto cuenta con un flujo automatizado de integración y entrega continua configurado en [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml):

1. **Disparador:** Cada `push` o `pull_request` sobre las ramas `main` o `master`.
2. **Entorno:** `ubuntu-latest` con Node.js 24 y caché de `npm`.
3. **Compilación:** Ejecuta `npm run build:prod:obf` (build de producción + ofuscación de código).
4. **Despliegue:** Despliega los activos de `dist/browser` a **Cloudflare Workers** utilizando `cloudflare/wrangler-action@v3` y las credenciales secretas (`CLOUDFLARE_API_TOKEN` y `CLOUDFLARE_ACCOUNT_ID`).

---

## 🔒 Seguridad y Optimización

- **Protección de Código:** El script `obfuscate.mjs` aplica transformaciones de control de flujo, compactación y mangle a los archivos JavaScript finales para proteger lógica sensible.
- **Rendimiento Web:**
  - Uso de imágenes optimizadas con formato WebP.
  - Carga diferida de scripts de analítica y AdSense tras la interacción inicial o evento `load`.
  - Carga diferida de componentes pesados con `@defer (on viewport)`.

---

## 📬 Contacto

- **Autor:** David Ortega — Ingeniero de Software Full Stack
- **Web Oficial:** [https://davidortega.dev](https://davidortega.dev)
- **LinkedIn:** [linkedin.com/in/davidortegacadena](https://www.linkedin.com/in/davidortegacadena)
- **GitHub:** [@david-ortegac](https://github.com/david-ortegac)
- **Email:** [smartandcomputer@gmail.com](mailto:smartandcomputer@gmail.com)

