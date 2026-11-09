# Personalizador del Entorno Visual Web

Aplicación web interactiva desarrollada en una sola página (Single Page Application) que permite al usuario personalizar su entorno visual. La aplicación gestiona dinámicamente el DOM y almacena las preferencias de usuario utilizando **cookies nativas de JavaScript** para garantizar la persistencia de los datos.

---

## Descripción de la Actividad

El objetivo de esta práctica es implementar una interfaz web capaz de modificar su aspecto en tiempo real y recordar la configuración seleccionada por el usuario (nombre, color de fondo y tema visual), incluso si se cierra o recarga el navegador.

### Característica y Requisitos Técnicos

* **Parte 1: Estructura y Generación Dinámica del DOM (Criterio d)**
  * Creación e inyección dinámica de un bloque de bienvenida (`<h2>` y `<p>`) si el usuario ya se ha registrado previamente.
  * Uso de métodos nativos (`createElement`, `textContent`, `appendChild`) evitando malas prácticas como `document.write()`.

* **Parte 2: Formulario y Modificación del Aspecto (Criterio c)**
  * **Nombre de Usuario:** Entrada de texto para personalizar la bienvenida.
  * **Color de Fondo:** `input[type="color"]` que aplica el cambio de fondo en tiempo real a través de `document.body.style.backgroundColor`.
  * **Tema Visual:** Selector de tema (Claro / Oscuro) gestionado mediante clases CSS dinámicas (`classList.add()` / `classList.remove()`), respetando la separación de estilos sin usar código en línea para el tema.

* **Parte 3: Persistencia con Cookies Nativas (Criterio g)**
  * **Cookie de Nombre y Color:** Configuradas con fecha de expiración a 7 días mediante el objeto `Date`.
  * **Cookie de Tema Visual:** Configurada como cookie de sesión (se borra al cerrar el navegador).
  * **Recuperación Automática:** Lectura y parsing de `document.cookie` al cargar la página para restaurar estilos e inputs del formulario.

* **Parte 4: Restablecimiento de Interfaz (Criterio c, g)**
  * Eliminación de cookies asignando fechas de caducidad en el pasado (`Thu, 01 Jan 1970 00:00:00 UTC`).
  * Restauración inmediata del aspecto por defecto del navegador.
  * Eliminación dinámica del nodo de bienvenida mediante manipulación del DOM (`removeChild`).

* **Parte 5: Documentación e Integración (Criterio h)**
  * Código fuente documentado con estándares JSDoc.
  * Documentación HTML autogenerada mediante la herramienta `jsdoc`.

---

## Estructura del Proyecto

```text
.
├── index.html          # Estructura principal de la aplicación
├── estilos.css         # Hojas de estilo y definiciones de temas (.tema-oscuro)
├── script.js           # Lógica JavaScript (DOM, Eventos y Cookies)
├── README.md           # Documentación general del proyecto
└── docs/               # Documentación técnica autogenerada con JSDoc (No incluida en GitHub Pages)
```

---

## Despliegue en GitHub Pages

**Enlace al proyecto desplegado:** [GitHub Pages - 3.4-Guardian_Interfaz](https://LastraMigue.github.io/3.4-Guardian_Interfaz/)