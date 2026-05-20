# E5 — Dockerfile (opcional)

**Como** evaluador
**Quiero** poder construir y ejecutar el servicio con Docker
**Para** probar la aplicación sin configurar dependencias locales.

## Requisitos
- `Dockerfile` que produzca una imagen ejecutable del servicio.
- `docker build -t prueba-match .` y `docker run -p 8080:8080 prueba-match` deben exponer el servicio en `localhost:8080`.

## Criterios de aceptación
- Imagen construible y servicio accesible en `localhost:8080`.
