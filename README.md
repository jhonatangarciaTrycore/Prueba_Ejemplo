# Prueba técnica — Match Service (Node + NestJS)

Proyecto mínimo para evaluar el *match* entre un candidato y una vacante.

## Estructura generada
- `server/` — aplicación NestJS con endpoint `POST /match`.

## Comandos rápidos
```bash
cd server
npm install
npm run start:dev   # iniciar en modo desarrollo (puerto 8080)
npm test            # ejecutar tests
```

## Siguientes pasos sugeridos
- Ejecutar `npm install` dentro de `server/` y correr `npm test`.
- Si quieres que logre el despliegue Docker o `/docs` OpenAPI, dime qué extensión prefieres.

## Decisiones

- **Caso borde: `skills_requeridas` vacío**: se ha decidido tratar `cobertura_skills = 1.0` (100%). Razonamiento: una vacante sin skills requeridas no debe penalizar a los candidatos; el score debe depender únicamente de la experiencia y del tipo de contrato en ese caso.

- **Redondeo y fórmula**: la implementación sigue exactamente la fórmula de la especificación: `score = round(cobertura_skills*70 + max(0,1 - brecha_experiencia/5)*20 + bonus_contrato)`. Los tests usan el redondeo estándar de JavaScript (`Math.round`).

## Estado de tests

- Los tests unitarios de la lógica (`server/src/match/match.service.spec.ts`) pasan localmente: **5/5**.

Comandos para reproducir:
```bash
cd server
npm install
npm test
```