let cerrar = document.querySelectorAll(".cerrar")[0];
let abrir = document.querySelectorAll(".btn-cambiar-contra")[0];
let modal = document.querySelectorAll(".modal")[0];
let modalC = document.querySelectorAll(".modal-contenedor")[0];
let mensaje = document.getElementById("message");

abrir.addEventListener("click", (e) => {
  e.preventDefault();
  modalC.style.opacity = "1";
  modalC.style.visibility = "visible";
  modal.classList.toggle("modal-close");
});

cerrar.addEventListener("click", (e) => {
  modal.classList.toggle("modal-close");
  setTimeout(() => {
    modalC.style.opacity = "0";
    modalC.style.visibility = "hidden";
  }, 500);
});

window.addEventListener("click", (e) => {
  if (e.target == modalC) {
    modal.classList.toggle("modal-close");
    setTimeout(() => {
      modalC.style.opacity = "0";
      modalC.style.visibility = "hidden";
    }, 500);
  }
});

setTimeout(() => {
  mensaje.classList.toggle("mensaje-activar");
}, 5000);
