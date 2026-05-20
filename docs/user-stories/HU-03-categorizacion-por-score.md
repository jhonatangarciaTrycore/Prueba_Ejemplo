# HU-03 — Categorización por score

**Como** producto
**Quiero** que la API devuelva una `categoria` legible según el `score`
**Para** facilitar la toma de decisiones por parte de reclutadores.

## Umbrales de categoría
- `NO_FIT` si `score < 40`
- `MAYBE` si `40 ≤ score < 65`
- `GOOD_FIT` si `65 ≤ score < 85`
- `EXCELLENT_FIT` si `score ≥ 85`

## Criterios de aceptación
- Tests que cubran los cuatro rangos exactos.
- `categoria` derivada únicamente del `score` calculado.
