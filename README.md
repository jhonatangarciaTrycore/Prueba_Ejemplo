# Prueba técnica — Match Service (Node + NestJS)

Proyecto mínimo para evaluar el *match* entre un candidato y una vacante.

## Estructura generada
- `server/` — aplicación NestJS con endpoint `POST /match`.

## Comandos rápidos
```bash
cd server
npm install
npm run start:dev   # iniciar en modo desarrollo (puerto 5000 por defecto)
npm test            # ejecutar tests
```

## Siguientes pasos sugeridos
- Ejecutar `npm install` dentro de `server/` y correr `npm test`.

## Decisiones

- **Caso borde — `skills_requeridas = []`**: en ese caso la implementación trata `cobertura_skills = 1.0` (100%). Para mayor claridad en la salida, la lista `razones` muestra `Sin skills requeridas (100%)` en lugar de `0/0 (100%)`.

## Estado de tests

- Los tests unitarios de la lógica (`server/src/match/match.service.spec.ts`) pasan localmente: **5/5**.