# E4 — Logging estructurado (opcional)

**Como** operador
**Quiero** logs en JSON-lines por cada request con el `score`
**Para** facilitar monitoreo y debugging.

## Requisitos
- Registrar cada request entrante con campos: timestamp, payload resumido, score calculado, status HTTP.
- Formato JSON-lines (una línea por request).

## Criterios de aceptación
- Logs escritos en formato JSON y documentados dónde encontrarlos.
