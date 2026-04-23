# VML Nbsp Detector 🛠️

Una herramienta de QA de alto rendimiento diseñada para detectar y resaltar visualmente entidades `&nbsp;` (non-breaking spaces) renderizadas en el DOM. Ideal para evitar errores de alineación y bugs visuales en implementaciones de AEM, Sitecore o desarrollos Custom.

**Desarrollado por:** Facundo Rodriguez Sabia (VML Front-End Team)

## 📋 Requisitos
* Google Chrome (o cualquier navegador basado en Chromium).
* Los archivos de la extensión descargados en una carpeta local.

## 🚀 Instalación
1. Descarga o clona este repositorio en tu máquina.
2. Abre Google Chrome y navega a `chrome://extensions/`.
3. Activa el **"Modo de desarrollador"** (Developer mode) en el interruptor de la esquina superior derecha.
4. Haz clic en el botón **"Cargar extensión sin empaquetar"** (Load unpacked).
5. Selecciona la carpeta raíz que contiene el archivo `manifest.json`.
6. ¡Listo! Fija la extensión en tu barra de herramientas para un acceso rápido.

## ⚙️ Uso
* Haz clic en el icono de la extensión para abrir el panel de control.
* Activa el switch para resaltar los espacios `&nbsp;` en la página actual.
* La página se recargará automáticamente para aplicar el escaneo del DOM.
* Los espacios detectados aparecerán con un resaltado rojo semitransparente.

-------------------------------------------------
## 🛡️ Seguridad y Privacidad (AppSec)

Esta extensión ha sido desarrollada siguiendo estrictamente los altos estándares de seguridad y las mejores prácticas para **Manifest V3** de Chrome, garantizando que sea apta para auditorías en entornos de nivel empresarial:

1. **Zero Data Tracking**: La extensión no recolecta, almacena, ni transmite ningún tipo de información personal, credenciales o datos de navegación a servidores externos. Absolutamente todo el procesamiento ocurre de manera local y efímera en el navegador del usuario.
2. **XSS Protection (DOM Sanitization)**: Se ha erradicado por completo el uso de métodos vulnerables como `innerHTML` o `eval()`. La reconstrucción del DOM y la inyección del resaltado se realizan exclusivamente mediante la instanciación de fragmentos seguros (`DocumentFragment`) y nodos de texto nativos (`createTextNode`). Esto neutraliza cualquier intento de inyección de scripts (Cross-Site Scripting) proveniente de contenido no sanitizado del CMS.
3. **Prevención de CSS Injection**: La inyección dinámica de estilos para controlar la opacidad del resaltado cuenta con una validación estricta de tipos de datos mediante `parseFloat`. Esto garantiza que los valores introducidos en la etiqueta `<style>` sean estrictamente matemáticos, bloqueando cualquier posible inyección de código CSS malicioso a través del almacenamiento local.
4. **Safe DOM Traversal (CORS Prevention)**: El algoritmo de escaneo del árbol DOM excluye explícitamente la lectura de etiquetas externas o de renderizado complejo como `IFRAME` y `CANVAS`. Esto previene posibles violaciones de políticas de mismo origen (Cross-Origin) y protege el rendimiento general de la página auditada.
5. **Sandbox Execution**: El script de contenido (*content script*) opera dentro de un "Isolated World" (Mundo Aislado) provisto por Chrome. Esto significa que la extensión no puede interferir, sobreescribir ni acceder a las variables globales, librerías de JS, o la lógica de negocio del sitio web que se está revisando.
6. **Permisos Mínimos (Principio de Menor Privilegio)**: Únicamente se requiere y declara el permiso de `storage` para persistir las preferencias de interfaz del usuario (estado ON/OFF y valor de opacidad).
7. **Cumplimiento Interno**: Diseñada para uso exclusivo en tareas de QA front-end, accesibilidad y auditoría visual. Aunque cuenta con sólidas medidas de seguridad preventivas, la recomendación estándar es mantener la herramienta en estado OFF al manipular directamente entornos de producción con información transaccional sensible.