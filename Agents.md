# VML Nbsp Detector — Chrome Extension

## Contexto del Proyecto

**Nombre:** VML Nbsp Detector  
**Tipo:** Extensión de Chrome (Manifest V3)  
**Autor:** Facundo Rodriguez Sabia (VML Front End Dev)  
**Propósito:** Detectar y resaltar visualmente caracteres `&nbsp;` (non-breaking spaces) en cualquier página web.

### Arquitectura Actual

| Archivo | Rol |
|---------|-----|
| `manifest.json` | Configuración MV3: permisos `storage`, content script global, popup |
| `popup.html` | UI del popup con toggle ON/OFF (estilos inline) |
| `popup.js` | Lógica del toggle: guarda estado en `chrome.storage.local`, recarga pestaña |
| `content.js` | Script inyectado: recorre el DOM buscando `\u00A0`, envuelve en `<span class="highlight-nbsp">` |
| `styles.css` | Estilos del highlight inyectado en páginas (fondo rojo 30%, outline punteado) |

### Assets Disponibles

- `frs-dev.png` — Foto del desarrollador (1841KB, cuadrada) → usar como avatar circular
- `logo-vml.png` — Logo VML (8KB, cuadrado blanco sobre negro) → branding en separador y footer

### Flujo Actual

1. Usuario abre el popup → `popup.js` lee `chrome.storage.local.active`
2. Toggle ON → guarda `active: true`, recarga la pestaña
3. `content.js` se ejecuta → si `active`, recorre `document.body` buscando `\u00A0`
4. Cada `&nbsp;` encontrado se envuelve en `<span class="highlight-nbsp">` (fondo rojo, outline)

