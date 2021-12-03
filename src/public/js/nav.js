const listElement = document.querySelectorAll(".nav-sup__mi-cuenta");

const addClick = () => {
  listElement.forEach((element) => {
    element.addEventListener("click", () => {
      var name = element.children[2].className;
      document
        .getElementById("nav-sup__sublista")
        .classList.remove(
          name === "nav-sup__sub-menu-disactive"
            ? "nav-sup__sub-menu-disactive"
            : "nav-sup__sub-menu-active"
        );

      document
        .getElementById("nav-sup__sublista")
        .classList.add(
          name === "nav-sup__sub-menu-disactive"
            ? "nav-sup__sub-menu-active"
            : "nav-sup__sub-menu-disactive"
        );
    });
  });
};

addClick();
