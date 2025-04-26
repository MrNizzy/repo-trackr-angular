# Repo Trackr Angular

RepoTrackr es una aplicación Angular que permite buscar y visualizar repositorios de GitHub para un usuario específico. El proyecto está construido con Angular versión 19.2.1, utilizando las últimas características de Angular y Material Design.

## Descripción del Proyecto

RepoTrackr Angular es una aplicación web moderna que proporciona una interfaz intuitiva para:

- Buscar usuarios de GitHub
- Visualizar todos los repositorios de un usuario específico
- Ordenar y filtrar los resultados por diferentes criterios
- Navegar a través de múltiples páginas de resultados
- Ver detalles específicos de cada repositorio como lenguaje de programación, estrellas, y fechas de creación/actualización

## Arquitectura y Tecnologías

Este proyecto ha sido implementado siguiendo las mejores prácticas de desarrollo de Angular:

- **Arquitectura por Características**: Organización del código basada en funcionalidades
- **Componentes Angular**: Uso de componentes autónomos con detección de cambios OnPush
- **Signals**: Manejo del estado utilizando la nueva API de Signals de Angular
- **Angular Material**: Componentes UI consistentes y accesibles
- **Directivas Personalizadas**: Implementación de efectos visuales como scroll-fade-in
- **Servicios HTTP**: Integración con API RESTful
- **Sistema de Tipos**: TypeScript para tipado estático
- **Transiciones de Vista**: Animaciones suaves entre rutas utilizando la API View Transitions

## Estructura del Proyecto

La organización del proyecto sigue una estructura clara y modular:

```
src/
├── app/                    # Código principal de la aplicación
│   ├── components/         # Componentes compartidos
│   │   ├── language-icon/  # Componente para iconos de lenguajes
│   │   └── paginator/      # Componente para paginación
│   ├── directives/         # Directivas personalizadas
│   └── pages/              # Páginas principales
│       ├── home/           # Página de inicio con buscador
│       └── repositories/   # Página de visualización de repositorios
├── environments/           # Configuración de entornos
├── themes/                 # Estilos y temas
└── public/                 # Recursos estáticos
    └── languages/          # Iconos SVG para lenguajes de programación
```

## Características Principales

### Búsqueda de Repositorios

La aplicación permite buscar repositorios mediante un formulario simple que valida la entrada del usuario antes de realizar la búsqueda. Se utiliza `startViewTransition` para proporcionar transiciones suaves entre vistas cuando el navegador lo soporta.

### Visualización de Repositorios

Los resultados se muestran en un diseño tipo tarjeta con información relevante:

- Nombre y descripción del repositorio
- Lenguaje principal (con icono visual correspondiente)
- Estadísticas: estrellas y forks
- Fechas de creación y última actualización

### Paginación y Ordenamiento

- Implementación de paginación para navegar entre resultados
- Opciones para ordenar por diferentes criterios (fecha de creación, actualización, nombre)
- Opciones para cambiar el orden ascendente/descendente
- Control para ajustar el número de resultados por página

### Responsive Design

La interfaz se adapta a diferentes tamaños de pantalla, proporcionando una experiencia óptima en dispositivos móviles y de escritorio.

## Integración con Backend

El proyecto se integra con una API RESTful que proporciona los datos de repositorios. La configuración de la URL de la API se encuentra en los archivos de entorno:

- **Desarrollo**: `http://localhost:8000/api`
- **Producción**: URL configurable en environment.ts

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

## Licencia

Este proyecto está licenciado bajo una [Licencia Creative Commons Attribution-NonCommercial 4.0 International (CC BY-NC 4.0)](https://creativecommons.org/licenses/by-nc/4.0/deed.es).

Esta licencia permite:

- Compartir: copiar y redistribuir el material en cualquier medio o formato
- Adaptar: remezclar, transformar y construir a partir del material

Bajo los siguientes términos:

- **Atribución**: Debe otorgarse el crédito correspondiente.
- **No Comercial**: El material no puede ser utilizado con fines comerciales.

Para más detalles, consulte el archivo LICENSE incluido en este repositorio.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
