/**
 * Función auxiliar para leer una cookie por su nombre
-  * @param {string} nombreNombre de la cookie a buscar
-  * @returns {string|null}Valor de la cookie decodificado o null si no existe
 */
function getCookie(nombre) {
    const pares = document.cookie.split("; ");
    for (let par of pares) {
        const [clave, valor] = par.split("=");
        if (clave === nombre) {
            return decodeURIComponent(valor);
        }
    }
    return null;
}

// Captura de elementos del DOM
const contenedorBienvenida = document.getElementById("contenedor-bienvenida");
const inputNombre = document.getElementById("nombre-usuario");
const campoColor = document.getElementById("color-fondo");
const selectTema = document.getElementById("tema-visual");
const formPreferencias = document.getElementById("form-preferencias");
const btnRestablecer = document.getElementById("btn-restablecer");

// Generación dinámica
const usuarioGuardado = getCookie("usuario");
if (usuarioGuardado) {
    const h2 = document.createElement("h2");
    h2.textContent = `¡Bienvenido de nuevo, ${usuarioGuardado}!`;

    const p = document.createElement("p");
    p.textContent = "Hemos recuperado tus preferencias guardadas previamente.";

    contenedorBienvenida.appendChild(h2);
    contenedorBienvenida.appendChild(p);
}

// Aplicar preferencias guardadas si las hubiese
const colorGuardado = getCookie("colorFondo");
const temaGuardado = getCookie("temaVisual");

if (colorGuardado) {
    document.body.style.backgroundColor = colorGuardado;
    campoColor.value = colorGuardado;
}

if (temaGuardado) {
    selectTema.value = temaGuardado;
    if (temaGuardado === "oscuro") {
        document.body.classList.add("tema-oscuro");
    } else {
        document.body.classList.remove("tema-oscuro");
    }
}

/**
 * Escucha el evento input en el selector de color para actualizar el fondo de forma inmediata.
 * @param {string} "input" - Tipo de evento que detecta cambios en tiempo real.
 * @param {Function} callback - Función flecha que asigna el valor del color al body.
 */
campoColor.addEventListener("input", () => {
    document.body.style.backgroundColor = campoColor.value;
});

/**
 * Escucha el evento change en el selector de tema para alternar entre clases CSS.
 * @param {string} "change" - Tipo de evento que detecta la selección de una opción.
 * @param {Function} callback - Función flecha que añade o elimina la clase tema-oscuro en el body.
 */
selectTema.addEventListener("change", () => {
    if (selectTema.value === "oscuro") {
        document.body.classList.add("tema-oscuro");
    } else {
        document.body.classList.remove("tema-oscuro");
    }
});

/**
 * Gestiona el evento submit del formulario para almacenar las preferencias del usuario en cookies.
 * @param {string} "submit" - Tipo de evento al enviar el formulario.
 * @param {Function} callback - Función flecha que previene el comportamiento por defecto, calcula fechas y guarda cookies.
 */
formPreferencias.addEventListener("submit", (e) => {
    e.preventDefault();

    const nombre = inputNombre.value;
    const color = campoColor.value;
    const tema = selectTema.value;

    // 1. Calcular fecha a 7 días
    const d = new Date();
    d.setTime(d.getTime() + (7 * 24 * 60 * 60 * 1000));
    const expiresStr = d.toUTCString();

    // 2. Guardar cookies
    document.cookie = `usuario=${encodeURIComponent(nombre)}; expires=${expiresStr}; path=/`;
    document.cookie = `colorFondo=${encodeURIComponent(color)}; expires=${expiresStr}; path=/`;
    document.cookie = `temaVisual=${encodeURIComponent(tema)}; path=/`;

    alert("Preferencias guardadas correctamente.");
    location.reload(); // 3. Recargar
});

/**
 * Gestiona el evento click en el botón de restablecer para borrar cookies y devolver la interfaz a su estado inicial.
 * @param {string} "click" - Tipo de evento al hacer clic en el botón.
 * @param {Function} callback - Función flecha que elimina las cookies, resetea estilos y limpia el DOM.
 */
btnRestablecer.addEventListener("click", () => {
    // 1. Eliminar cookies
    const fechaPasada = "Thu, 22 Feb 2002 00:00:00 UTC";
    document.cookie = `usuario=; expires=${fechaPasada}; path=/`;
    document.cookie = `colorFondo=; expires=${fechaPasada}; path=/`;
    document.cookie = `temaVisual=; expires=${fechaPasada}; path=/`;

    // 2. Devolver la página a su aspecto visual por defecto
    document.body.style.backgroundColor = "";
    document.body.classList.remove("tema-oscuro");
    formPreferencias.reset();

    // 3. Eliminar bloque de bienvenida
    while (contenedorBienvenida.firstChild) {
        contenedorBienvenida.removeChild(contenedorBienvenida.firstChild);
    }
});