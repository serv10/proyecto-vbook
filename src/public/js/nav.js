const listElement = document.querySelectorAll(".nav-sup__mi-cuenta");
const lista = document.getElementById("nav-sup__sublista");
const addClick = () => {
  listElement.forEach((element) => {
    element.addEventListener("click", () => {
      lista.classList.toggle("nav-sup__sub-menu-disactive");
    });
  });
};

addClick();
