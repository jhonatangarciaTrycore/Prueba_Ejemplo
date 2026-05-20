# HU-05 — Validación y errores claros

**Como** consumidor del servicio
**Quiero** respuestas `400` con mensajes claros cuando la entrada falte o tenga el tipo incorrecto
**Para** detectar y corregir integraciones rápidamente.

## Campos obligatorios (request)
- `candidato` (objeto)
  - `skills` (lista de strings)
  - `experiencia_anios` (int)
- `vacante` (objeto)
  - `skills_requeridas` (lista de strings)
  - `experiencia_min` (int)
  - `tipo_contrato` (string, permitidos: `indefinido`, `obra_labor`, `prestacion_servicios`)

## Reglas de error
- Si falta un campo obligatorio: `400` con `{ "error": "campo X requerido" }`.
- Si el tipo es incorrecto: `400` con mensaje que indique el campo y el tipo esperado.

## Criterios de aceptación
- Validaciones cubiertas por tests.
- Mensajes consistentes y documentados en README.
