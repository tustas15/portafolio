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
    // Intersection Observer para scroll animation
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show-scroll');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const hiddenElements = document.querySelectorAll('.hidden-scroll');
    hiddenElements.forEach((el) => observer.observe(el));

});