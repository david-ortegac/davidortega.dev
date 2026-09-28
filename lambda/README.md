# Tutorials & Secrets Lambda Service (Node.js + TypeScript)

Este servicio está construido en TypeScript y optimizado específicamente para ejecutarse en **AWS Lambda** (Node.js 20.x o 22.x) sin dependencias pesadas ni necesidad de subir carpetas `node_modules` (el `.zip` generado pesa solo ~5 KB).

---

## 🏗️ Arquitectura Hexagonal (Ports & Adapters)

El microservicio está estrictamente desacoplado siguiendo los principios de la Arquitectura Hexagonal:

```text
lambda/src/
├── domain/                                  # 1. NÚCLEO / DOMINIO (Sin dependencias externas)
│   ├── models/
│   │   ├── video.model.ts                   # Entidad Video y opciones de consulta
│   │   └── secret.model.ts                  # Entidad Secret
│   └── errors/
│       └── app.errors.ts                    # Excepciones de dominio (Unauthorized, NotFound, etc.)
│
├── application/                             # 2. CASOS DE USO / PUERTOS (Lógica de aplicación)
│   ├── ports/
│   │   ├── in/                              # Puertos de Entrada (Driving)
│   │   │   ├── get-tutorials.use-case.ts    # Interfaz del caso de uso GetTutorials
│   │   │   └── get-secret.use-case.ts       # Interfaz del caso de uso GetSecret
│   │   └── out/                             # Puertos de Salida (Driven)
│   │       ├── video-gateway.port.ts        # Contrato para proveedores de video
│   │       ├── secrets-repository.port.ts   # Contrato para repositorios de secretos
│   │       └── cache.port.ts                # Contrato para almacenamiento en caché
│   └── use-cases/
│       ├── get-tutorials.service.ts         # Implementa GetTutorialsUseCase con caché
│       └── get-secret.service.ts            # Implementa GetSecretUseCase con validación
│
└── infrastructure/                          # 3. INFRAESTRUCTURA / ADAPTADORES (Mundo exterior)
    ├── adapters/
    │   ├── in/                              # Adaptadores de Entrada (Primary)
    │   │   ├── lambda/                      # Adaptador para AWS Lambda / Function URLs
    │   │   │   └── lambda.adapter.ts
    │   │   └── http/                        # Adaptador para servidor Node local
    │   │       └── local-server.adapter.ts
    │   └── out/                             # Adaptadores de Salida (Secondary)
    │       ├── youtube/                     # Adaptador para YouTube Data API v3
    │       │   └── youtube-api.adapter.ts
    │       ├── secrets/                     # Adaptador de secretos (Variables de entorno)
    │       │   └── env-secrets.adapter.ts
    │       └── cache/                       # Adaptador de caché en memoria con TTL
    │           └── memory-cache.adapter.ts
    └── config/
        └── dependencies.ts                  # Composition Root (Inyección de dependencias)
```

---

## 🛠️ Comandos de Desarrollo

```bash
# Instalar dependencias de desarrollo
cd lambda
bun install   # o npm install

# Probar localmente en http://localhost:3000
bun run dev

# Compilar y generar el archivo dist/lambda.zip
bun run build
```

---

## ☁️ Pasos para Desplegar en AWS Lambda

### 1. Crear la Función en AWS
1. Entra a la consola de **AWS Lambda** y haz clic en **Create function** (*Crear función*).
2. Selecciona **Author from scratch** (*Crear desde cero*).
3. **Function name**: `davidortega-tutorials-service` (o el nombre que prefieras).
4. **Runtime**: `Node.js 20.x` o `Node.js 22.x`.
5. **Architecture**: `arm64` (más económico y rápido) o `x86_64`.
6. Haz clic en **Create function**.

### 2. Subir el Código
1. En la pestaña **Code**, haz clic en el botón **Upload from** -> **.zip file**.
2. Selecciona el archivo generado: `lambda/dist/lambda.zip`.
3. Verifica que el **Runtime settings -> Handler** sea:
   ```text
   index.handler
   ```

### 3. Configurar Variables de Entorno
Ve a la pestaña **Configuration** -> **Environment variables** y agrega:
- `YOUTUBE_API_KEY`: Tu API Key obtenida en Google Cloud Console.
- `YOUTUBE_CHANNEL_ID`: `UClQ8npg3voyOWGWEO543GqA` (o tu ID de canal).
- `AUTH_TOKEN`: `s3cure_cpanel_consumer_token` (o tu token personalizado).

### 4. Habilitar Lambda Function URL (La forma más rápida y sin costo de API Gateway)
1. En **Configuration**, ve a la sección **Function URL** y haz clic en **Create function URL**.
2. **Auth type**: Selecciona `NONE` (público para que tu frontend Angular pueda invocarlo).
3. **Configure cross-origin resource sharing (CORS)**:
   - Activa el checkbox **Configure CORS**.
   - **Allow origin**: `*` (o `https://davidortega.dev`, `http://localhost:4200`).
   - **Allow headers**: `authorization`, `content-type`.
   - **Allow methods**: `GET`, `OPTIONS`.
4. Guarda y copia la URL generada:
   ```text
   https://xxxxxxxxxxxxxxxxxxxx.lambda-url.us-east-1.on.aws
   ```

*(Opcional: Si tienes dominio propio en Route53/CloudFront, puedes asociar `ghasecrets.davidortega.dev` a esta Lambda URL o API Gateway).*

---

## 🔗 Conectar la Lambda con Angular

Solo debes actualizar la variable `apiUrl` en los archivos de entorno de Angular:

1. En [src/environments/environment.ts](file:///home/david/Documentos/GitHub/davidortega.dev/src/environments/environment.ts):
```typescript
export const environment = {
  production: true,
  apiUrl: 'https://TU_LAMBDA_URL.on.aws'
};
```

2. En [src/environments/environment.development.ts](file:///home/david/Documentos/GitHub/davidortega.dev/src/environments/environment.development.ts):
```typescript
export const environment = {
  production: false,
  apiUrl: 'https://TU_LAMBDA_URL.on.aws' // O 'http://localhost:3000' cuando pruebes con bun run dev
};
```
