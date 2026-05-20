# HU-02 — Implementación de la lógica de matching

**Como** ingeniero
**Quiero** que la API calcule el matching exactamente según la especificación
**Para** garantizar consistencia y reproducibilidad del `score`.

## Reglas (implementación exacta)
- `cobertura_skills = len(skills ∩ skills_requeridas) / len(skills_requeridas)`
- `brecha_experiencia = max(0, experiencia_min - experiencia_anios)`
- `bonus_contrato = 10` si `tipo_contrato == "indefinido"`, `5` si `"obra_labor"`, `0` si `"prestacion_servicios"`.

## Fórmula de score (0–100)
```
score = round(
  cobertura_skills * 70
  + max(0, 1 - brecha_experiencia / 5) * 20
  + bonus_contrato
)
```
- La normalización de la experiencia usa un divisor de `5` años.
- El resultado se redondea con `round(...)` antes de truncar al entero.

## Criterios de aceptación
- Implementación coincide con las fórmulas anteriores.
- Bonus de contrato aplicado según el mapeo.
