let mensaje = document.getElementById("message");

if (mensaje != null) {
  setTimeout(() => {
    mensaje.classList.toggle("mensaje-activar");
  }, 5000);
}
