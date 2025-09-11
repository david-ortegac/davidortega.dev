# Configuración de GitHub Secrets

Este proyecto utiliza GitHub Secrets para inyectar variables de entorno de forma segura durante el proceso de build y deploy.

## Secrets Requeridos

Para que el GitHub Actions funcione correctamente, necesitas configurar los siguientes secrets en tu repositorio:

### 1. API_KEY

- **Descripción**: API Key de YouTube para acceder a la API de YouTube Data v3
- **Cómo obtenerlo**:
  1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
  2. Crea un nuevo proyecto o selecciona uno existente
  3. Habilita la API de YouTube Data v3
  4. Ve a "Credenciales" y crea una "Clave de API"
  5. Copia la clave generada

### 2. CHANNEL_ID

- **Descripción**: ID del canal de YouTube que se utilizará para obtener los videos
- **Cómo obtenerlo**:
  1. Ve a tu canal de YouTube
  2. El ID del canal se encuentra en la URL: `https://www.youtube.com/channel/CHANNEL_ID`
  3. También puedes encontrarlo en la configuración del canal

## Cómo Configurar los Secrets

1. Ve a tu repositorio en GitHub
2. Haz clic en "Settings" (Configuración)
3. En el menú lateral, selecciona "Secrets and variables" > "Actions"
4. Haz clic en "New repository secret"
5. Agrega cada secret con su nombre y valor correspondiente

## Verificación

Una vez configurados los secrets, el GitHub Actions:

- Se ejecutará automáticamente en cada push a las ramas `master` o `main`
- Inyectará las variables de entorno durante el build
- Desplegará la aplicación a GitHub Pages si el build es exitoso

## Desarrollo Local

Para desarrollo local, puedes crear un archivo `.env` en la raíz del proyecto:

```env
API_KEY=tu_api_key_aqui
CHANNEL_ID=tu_channel_id_aqui
```

**Nota**: No commitees el archivo `.env` al repositorio. Asegúrate de agregarlo a tu `.gitignore`.

## Deploy en cPanel

Si usas cPanel para el deploy, configura las variables de entorno en tu panel de control:

1. Ve a la sección "Variables de Entorno" en cPanel
2. Agrega las siguientes variables:
   - `API_KEY`: Tu API key de YouTube
   - `CHANNEL_ID`: El ID de tu canal de YouTube

El archivo `.cpanel.yml` ya está configurado para usar estas variables automáticamente durante el build.
