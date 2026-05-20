# HU-06 — Caso borde: `skills_requeridas` vacío

**Como** responsable de producto
**Quiero** un comportamiento determinístico cuando `skills_requeridas` esté vacío
**Para** evitar resultados no deterministas o divisiones por cero.

## Decisión propuesta (documentar en README)
- Si `skills_requeridas` está vacío, tratar `cobertura_skills = 1.0` (100%).
  - Razonamiento: una vacante sin skills requeridas no debe penalizar candidatos; así el score depende sólo de experiencia y contrato.

## Criterios de aceptación
- Test que verifique `cobertura_skills == 1.0` cuando `skills_requeridas` == [] y que el `score` sea determinístico.
- Decisión documentada en README bajo "Decisiones".
