# AGENTS — Instrucciones rápidas para agentes AI (Stack: Node + NestJS)

Propósito: guía breve para agentes AI que trabajen en esta prueba técnica (Node + NestJS).

## Qué hay aquí
- Especificación de la prueba: [full-stack.docx.md](full-stack.docx.md)
- Historias de usuario y criterios: [docs/user-stories](docs/user-stories)

## Prioridades inmediatas para un agente (Node + NestJS)
1. Buscar `package.json`. Si existe, ejecutar `npm install` y `npm test` para comprobar el estado actual.
2. Si no existe código, scaffold un proyecto NestJS mínimo (ver comandos abajo) y crear `POST /match` siguiendo [HU-02](docs/user-stories/HU-02-implementacion-logica-matching.md).
3. Implementar DTOs, servicio y controlador (`match`) y añadir tests unitarios según [HU-07](docs/user-stories/HU-07-pruebas-unitarias.md).

## Comandos rápidos (Node + NestJS)
- Instalar dependencias:
  - `npm install`
- Tests:
  - `npm test`
  - `npm run test:watch`
- Ejecutar en desarrollo:
  - `npm run start:dev`

## Scaffolding sugerido (si no hay proyecto)
1. Crear proyecto NestJS (usa `npx` si no tienes `@nestjs/cli` global):
  - `npx @nestjs/cli new server --package-manager npm`
2. Entrar al proyecto y generar recursos:
  - `cd server`
  - `npx nest g controller match --no-spec`
  - `npx nest g service match --no-spec`
3. Implementar `POST /match` en `src/match/match.controller.ts` y la lógica en `src/match/match.service.ts`.
4. Añadir DTOs (`src/match/dto/*.ts`) y tests: `src/match/match.service.spec.ts`.

Si prefieres no crear una carpeta nueva, puedes inicializar manualmente:
  - `npm init -y`
  - `npm install @nestjs/core @nestjs/common @nestjs/platform-express reflect-metadata rxjs`
  - instalar dev deps: `npm install -D typescript ts-node-dev @types/node jest @types/jest ts-jest`

## Implementación mínima esperada
- Endpoint: `POST /match` que acepte `{ candidato, vacante }` y devuelva `{ score, categoria, cobertura_skills, brecha_experiencia, razones }`.
- Validaciones: devolver `400` con `{ "error": "campo X requerido" }` si faltan campos obligatorios.
- Tests: usar Jest (configuración estándar de Nest) y cubrir los casos indicados en [HU-07](docs/user-stories/HU-07-pruebas-unitarias.md).

## Convenciones y notas operativas
- Mensajes de commit: usar imperativo y descriptivo (ej.: `Add match endpoint`, `Add unit tests for EXCELLENT_FIT`).
- README.md en la raíz debe incluir comandos exactos para instalar, ejecutar y testear, y una sección `Decisions` con ambigüedades resueltas (p. ej. `skills_requeridas` vacío).
- Si implementas extensiones (E1–E5), documenta brevemente en README dónde encontrarlas.

## Enlaces útiles dentro del repo
- Reglas de matching: [docs/user-stories/HU-02-implementacion-logica-matching.md](docs/user-stories/HU-02-implementacion-logica-matching.md)
- Historias de usuario: [docs/user-stories](docs/user-stories)

---

¿Quieres que scaffolde el proyecto `server/` con NestJS ahora y añada el endpoint `POST /match` y tests mínimos?
