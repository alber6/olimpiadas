

export function marcar(elemento) {
// Si quieres que solo un enlace se quede marcado:
document.querySelectorAll(".enlace").forEach(e => e.classList.remove("activo"));
elemento.classList.add("activo");
}

