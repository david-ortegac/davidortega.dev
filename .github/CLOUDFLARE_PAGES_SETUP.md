# Despliegue en Cloudflare Pages con GitHub Actions y Wrangler

Este repositorio está configurado para desplegar automáticamente el frontend de Angular a **Cloudflare Pages** cada vez que haces `git push` a `master` o `main`.

---

## 🔑 Secrets Requeridos en GitHub

Ve a tu repositorio en GitHub:
**Settings** -> **Secrets and variables** -> **Actions** -> **New repository secret** y agrega:

| Nombre del Secret | Descripción | Dónde obtenerlo |
| :--- | :--- | :--- |
| **`CLOUDFLARE_API_TOKEN`** | Token de API para desplegar en Pages | Cloudflare Dashboard -> **My Profile** -> **API Tokens** -> **Create Token** -> Plantilla **"Cloudflare Pages"** (Permisos: `Cloudflare Pages: Edit`). |
| **`CLOUDFLARE_ACCOUNT_ID`** | ID de tu cuenta de Cloudflare | Cloudflare Dashboard -> Entra a tu dominio o sección **Workers & Pages** -> En la barra lateral derecha copia tu **Account ID** (32 caracteres). |

---

## 🛠️ Pasos para la Primera Vez en Cloudflare

### 1. Crear el proyecto en Cloudflare Pages
1. Entra a tu [Cloudflare Dashboard](https://dash.cloudflare.com/).
2. En el menú lateral izquierdo ve a **Workers & Pages**.
3. Haz clic en **Create application** (Crear aplicación) -> Pestaña **Pages**.
4. Selecciona **Upload assets** (Subir archivos directamente).
5. Asigna el nombre exacto del proyecto:
   ```text
   royal-mouse-7c45
   ```
6. Haz clic en **Create project**. *(No es necesario subir archivos manualmente ahora, GitHub Actions lo hará).*

---

### 2. Conectar tu Dominio Personal (`davidortega.dev`)
1. Dentro de tu proyecto en Cloudflare Pages (`royal-mouse-7c45`), ve a la pestaña **Custom domains** (Dominios personalizados).
2. Haz clic en **Set up a custom domain**.
3. Escribe tu dominio: `davidortega.dev` (y opcionalmente `www.davidortega.dev`).
4. Como tu dominio ya está gestionado por Cloudflare, se configurará el registro DNS automáticamente con un solo clic.

---

### 3. Soporte para Rutas SPA de Angular
Ya se encuentra configurado el archivo `public/_redirects`:
```text
/*    /index.html   200
```
Esto garantiza que al recargar páginas directas como `https://davidortega.dev/tutorials` o `https://davidortega.dev/privacy-policy`, Cloudflare Pages responda con `index.html` (HTTP 200) y Angular gestione la navegación sin errores 404.

---

## 🚀 Despliegue Local con Wrangler (Opcional)

Si en algún momento deseas subir la aplicación directamente desde tu máquina sin esperar a GitHub Actions:

```bash
# Iniciar sesión en Cloudflare desde tu terminal
npx wrangler login

# Compilar y desplegar
bun run deploy:pages
# o bien:
npm run deploy:pages
```
