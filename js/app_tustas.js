//Script para el navbar
document.addEventListener("DOMContentLoaded", function () {
    const header = document.querySelector("header");
    const scrollThreshold = 50; // Píxeles a desplazar para que se encoja

    function checkScroll() {
        if (window.scrollY > scrollThreshold) {
            header.classList.add("navbar-shrink");
        } else {
            header.classList.remove("navbar-shrink");
        }
    }

    // Comprobar al cargar la página por si no está en la parte superior
    checkScroll();

    // Comprobar al hacer scroll
    window.addEventListener("scroll", checkScroll);

    // Actualizar año en el footer (si no lo tienes ya)
    const yearSpan = document.getElementById("year");
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

});