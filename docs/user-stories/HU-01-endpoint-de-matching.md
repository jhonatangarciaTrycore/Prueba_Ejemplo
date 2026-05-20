# HU-01 — Endpoint de matching

**Como** reclutador
**Quiero** enviar candidato + vacante a `POST /match`
**Para** recibir `score`, `categoria`, `cobertura_skills`, `brecha_experiencia` y `razones`.

## Criterios de aceptación
- Responde `200` con un JSON que contiene las 5 claves: `score`, `categoria`, `cobertura_skills`, `brecha_experiencia`, `razones`.
- `score` es entero entre 0 y 100.
- `categoria` ∈ {`NO_FIT`, `MAYBE`, `GOOD_FIT`, `EXCELLENT_FIT`}.
- Si falta cualquier campo obligatorio, devuelve `400` con `{ "error": "campo X requerido" }`.

## Ejemplo de request
```json
{
  "candidato": { "skills": ["java","spring"], "experiencia_anios": 3 },
  "vacante": { "skills_requeridas": ["java","spring","kafka"], "experiencia_min": 5, "tipo_contrato": "indefinido" }
}
```

> Ver HU-02 para la fórmula de cálculo del `score`.
