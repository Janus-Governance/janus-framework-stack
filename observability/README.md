# Janus Observability Layer v1

Capa mínima de observabilidad para Janus Framework Stack, basada 100% en logs reales del runtime.

## Características
- Solo lectura (read-only)
- Sin frameworks (HTML + JS puro)
- Visualiza:
  - Runtimes disponibles
  - Eventos (AUDIT + MANAGEMENT)
  - Schema
  - Health estructural (presencia/validez de logs)
- No requiere ni usa `cases/` ni `registry.json`
- No deriva estado complejo
- No modifica nada del runtime

## Uso
1. Levanta un servidor local en la raíz del repo (por ejemplo, con `python3 -m http.server` o `npx serve`)
2. Accede a `http://localhost:8000/observability/` en tu navegador

## Notas
- El sistema asume que los logs están en `runtimes/<name>/logs/` y que cada runtime tiene:
  - `AUDIT_LOG.json`
  - `MANAGEMENT_LOG.json`
  - `SCHEMA_LOG.json`
- Si algún log falta o es inválido, se muestra en la sección de health estructural.
- No se inventan estructuras ni se derivan estados inexistentes.
- El código es mínimo y alineado con la arquitectura real de Janus.
