# Prueba técnica Fast Track — full-stack

Trycore Colombia · Equipo de TH

Table of Contents

# Prueba técnica Fast Track — Trycore Colombia

## Ingeniero de Desarrollo Full Stack

Duración: **máximo 2 horas en sesión sincrónica**. Entrega vía repositorio Git público.

---

Hola,

Gracias por tu interés en hacer parte de Trycore. Esta prueba es **corta y enfocada**: queremos ver cómo piensas, cómo organizas código y cómo usas la IA cuando tienes tiempo limitado — no si memorizas algoritmos.

No esperamos un producto. Esperamos **decisiones claras y código limpio en lo que sí construiste**.

---

## El problema

Trycore necesita un **micro-servicio que evalúe el "match" entre un candidato y una vacante** según sus skills declaradas, años de experiencia y un tipo de contrato. La lógica es la siguiente — y es lo único que tienes que implementar:

### Reglas de matching

Dado un candidato con skills (lista de strings) y experiencia\_anios (int), y una vacante con skills\_requeridas (lista de strings), experiencia\_min (int) y tipo\_contrato (indefinido | obra\_labor | prestacion\_servicios), calcula:

1. **cobertura\_skills** \= len(skills ∩ skills\_requeridas) / len(skills\_requeridas) — porcentaje de cobertura de skills.

2. **brecha\_experiencia** \= max(0, experiencia\_min \- experiencia\_anios) — años faltantes (0 si el candidato cumple o supera).

3. **score** (0–100):

* score \= round(  
    cobertura\_skills \* 70                      (peso 70%)  
    \+ max(0, 1 \- brecha\_experiencia / 5\) \* 20  (peso 20%, normalizado a 5 años)  
    \+ bonus\_contrato                           (peso 10%)  
  )

* Donde bonus\_contrato \= 10 si tipo\_contrato \== "indefinido", 5 si obra\_labor, 0 si prestacion\_servicios.

4. **categoria** (string):

   * NO\_FIT si score \< 40

   * MAYBE si 40 ≤ score \< 65

   * GOOD\_FIT si 65 ≤ score \< 85

   * EXCELLENT\_FIT si score ≥ 85

5. **razones** (lista de strings): explicación legible para humanos de los factores que más pesan (al menos 1 razón, máximo 3). Ej. "Cobertura de skills 4/5 (80%)", "Brecha de experiencia: 2 años", "Contrato a término indefinido suma 10 puntos".

### Ejemplo

**Input:**

{  
  "candidato":  { "skills": \["java", "spring", "sql"\], "experiencia\_anios": 3 },  
  "vacante":    { "skills\_requeridas": \["java", "spring", "kafka", "sql"\], "experiencia\_min": 5, "tipo\_contrato": "indefinido" }  
}

**Output esperado:**

{  
  "score": 67,  
  "categoria": "GOOD\_FIT",  
  "cobertura\_skills": 0.75,  
  "brecha\_experiencia": 2,  
  "razones": \[  
    "Cobertura de skills 3/4 (75%)",  
    "Brecha de experiencia: 2 años (penalización aplicada)",  
    "Contrato indefinido suma 10 puntos"  
  \]  
}

---

## Qué debes construir

### Mínimo viable (obligatorio)

1. **API HTTP** con un único endpoint: POST /match que reciba el JSON de candidato \+ vacante y devuelva la respuesta calculada.

2. **Lógica de matching** implementada exactamente según las reglas anteriores.

3. **Pruebas unitarias** que cubran la función de matching:

   * Caso EXCELLENT\_FIT (todas las skills, experiencia ≥ mínimo, indefinido).

   * Caso NO\_FIT (cobertura baja o experiencia muy lejos).

   * Caso borde: skills\_requeridas vacía → score debe ser determinístico y documentado (decisión tuya, justifícala en el README).

   * Caso borde: experiencia\_anios mayor que experiencia\_min → no debe descontar.

   * Caso MAYBE y caso GOOD\_FIT (1 test cada uno).

4. **Validación de input**: si falta cualquier campo obligatorio, devolver HTTP 400 con { "error": "campo X requerido" }.

5. **README.md** con:

   * Comando exacto para instalar dependencias y correr el servicio.

   * Comando exacto para correr los tests.

   * Decisiones que tomaste (cualquier ambigüedad de las reglas que resolviste por tu cuenta).

### Extensiones opcionales

**No son requeridas para aprobar.** Si terminas la parte obligatoria antes de los 100 minutos, elige una o varias. Cada extensión completada es una señal adicional de seniority.

* **E1 — Frontend mínimo**: una página HTML que llame al endpoint y muestre el resultado (formato libre, sin diseño elaborado).

* **E2 — Validación tipada**: usa el mecanismo idiomático de tu stack (Pydantic, Joi, Zod, Bean Validation, etc.) en lugar de validar a mano.

* **E3 — Documentación OpenAPI**: expón /docs con la especificación del endpoint.

* **E4 — Logging estructurado**: registra cada request con score calculado en formato JSON-lines.

* **E5 — Dockerfile**: docker build && docker run deja el servicio corriendo en localhost:8080.

---

## Stack tecnológico

Usa el que tengas mayor dominio. Preferencias de Trycore: **Java \+ Spring Boot**, **Python \+ FastAPI** o **Node \+ Express/NestJS**. Si eliges otro, documéntalo en el README en una línea.

---

## Entrega

### 1\. Repositorio Git **público**

* GitHub o GitLab.

* **Público**. Sin URL privada ni archivos comprimidos.

* Mínimo **3 commits** con mensajes descriptivos en imperativo (ej. Add match endpoint, Fix score rounding on boundary, Add edge case tests). Mensajes tipo wip, cambios o fix no son aceptables.

### 2\. README.md

En la raíz del repo. Contiene las instrucciones de ejecución y de tests, y la lista de decisiones que tomaste por tu cuenta.

### 3\. Link al repo

Compártelo en el chat de la sesión antes de cerrar la hora. **No se acepta entrega posterior al cierre de la sesión.**

---

## Criterios de aceptación

La evaluación se hace contra estos criterios — son verificables, no subjetivos. La Gema evaluadora los validará uno por uno.

| ID | Criterio | Verifica |
| :---- | :---- | :---- |
| **AC-01** | El repo es público en GitHub o GitLab | URL accesible sin auth |
| **AC-02** | README.md presente en la raíz con sección "Cómo correr" y "Cómo testear" | Existencia de archivos y secciones |
| **AC-03** | Comando de ejecución del README arranca el servicio sin error | Ejecución manual o documentada |
| **AC-04** | Endpoint POST /match responde 200 y devuelve los 5 campos del schema (score, categoria, cobertura\_skills, brecha\_experiencia, razones) | Llamada de prueba |
| **AC-05** | Para los 4 casos de matching del ejemplo arriba (EXCELLENT\_FIT, GOOD\_FIT, MAYBE, NO\_FIT) la categoría devuelta es la esperada | Suite de tests del candidato \+ verificación manual |
| **AC-06** | Input inválido (faltante o tipo incorrecto) devuelve HTTP 400 con mensaje de error claro | Llamada de prueba |
| **AC-07** | El repo contiene ≥ 5 pruebas unitarias sobre la lógica de matching | Conteo en archivos \*test\* o equivalente |
| **AC-08** | Las pruebas pasan localmente | Ejecución del comando de tests |
| **AC-09** | El historial git tiene ≥ 3 commits con mensajes descriptivos (no wip/fix/cambios) | git log |
| **AC-10** | Decisiones de ambigüedad documentadas en el README | Sección presente |

### Señales adicionales de seniority (no obligatorias)

* Cada extensión opcional completada (E1–E5) suma señal.

* Estructura del proyecto (separación de capas, no toda la lógica en el handler).

* Manejo de errores explícito (no excepciones genéricas).

* Pruebas de casos borde que tú identificaste, no solo los del enunciado.

* Decisiones documentadas con razonamiento, no descripción.

---

## Lo que NO esperamos

* Diseño UI elaborado.

* Cobertura del 100%.

* Documentación extensa.

* Resolver las extensiones opcionales completas.

* Que no uses IA. **Puedes y debes** usar IA si te ayuda; lo que importa es que entiendas lo que entregas.

---

## Lo que NO aceptamos

* Repo privado o link a Drive/Dropbox/zip.

* Código copiado sin entender (te lo preguntaremos en la siguiente fase).

* Commits masivos al final con mensajes vacíos.

* README ausente o vacío.

---

## Cómo se evalúa

Tras la entrega, el equipo de TH ejecuta una **Gema evaluadora** sobre el link de tu repo. La Gema verifica los 10 criterios de aceptación, identifica señales de seniority y emite una recomendación. El informe es leído por TH; en caso de señales mixtas, lo revisa un líder técnico.

**El mayor peso es el código que escribiste y las decisiones que documentaste, no el volumen entregado.**

---

Cualquier duda durante la sesión, pregúntale al reclutador. Si tu duda es técnica ("¿qué framework uso?", "¿debe persistir en BD?"), el reclutador te redirigirá con: "el que tengas mayor dominio" / "no, no persiste, todo en memoria".

Éxitos.

**Equipo de Tecnología — Trycore Colombia**