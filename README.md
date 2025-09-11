# DavidortegaDev

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.15.

## Configuración de Variables de Entorno

Este proyecto utiliza variables de entorno para configurar la API de YouTube. Para configurar las variables:

### Desarrollo Local

1. Crea un archivo `.env` en la raíz del proyecto:
```bash
# Variables de entorno para desarrollo local
API_KEY=tu_api_key_de_youtube_aqui
CHANNEL_ID=tu_channel_id_de_youtube_aqui
```

2. Ejecuta el servidor de desarrollo:
```bash
npm start
```

### Producción

#### GitHub Actions
Las variables de entorno se inyectan automáticamente desde GitHub Secrets durante el build. Configura estos secrets en tu repositorio:

- `API_KEY`: Tu API key de YouTube
- `CHANNEL_ID`: El ID de tu canal de YouTube

#### cPanel
Si usas cPanel para el deploy, configura las variables de entorno en tu panel de control:

1. Ve a la sección "Variables de Entorno" en cPanel
2. Agrega `API_KEY` y `CHANNEL_ID` con tus valores

Para más detalles, consulta [.github/SECRETS_SETUP.md](.github/SECRETS_SETUP.md).

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
