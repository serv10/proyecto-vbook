const formulario = document.getElementById("form-registro");
const inputs = document.querySelectorAll("#form-registro input");

const expresiones = {
  nombre: /^[a-zA-ZÀ-ÿ\s]{1,50}$/, // Letras y espacios, pueden llevar acentos.
  apellido: /^[a-zA-ZÀ-ÿ\s]{1,50}$/, // Letras y espacios, pueden llevar acentos.
  password: /^.{4,10}$/, // 4 a 10 digitos.
  correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
  dni: /^[0-9]{8}$/, // 8 digitos.
};

const validarFormulario = (e) => {
  switch (e.target.name) {
    case "nombre":
      validarCampo(expresiones.nombre, e.target, "nombre");
      break;
    case "apellidoPaterno":
      validarCampo(expresiones.apellido, e.target, "apellido");
      break;
    case "password":
      validarCampo(expresiones.password, e.target, "contra");
      validarPassword2();
      break;
    case "password2":
      validarPassword2();
      break;
    case "correo_electronico":
      validarCampo(expresiones.correo, e.target, "correo");
      break;
    case "dni":
      validarCampo(expresiones.dni, e.target, "dni");
      break;
  }
};

const validarCampo = (expresion, input, campo) => {
  if (expresion.test(input.value)) {
    document
      .getElementById(`grupo__${campo}`)
      .classList.remove("formulario__grupo-incorrecto");
    document
      .getElementById(`grupo__${campo}`)
      .classList.add("formulario__grupo-correcto");
    document
      .querySelector(`#grupo__${campo} i`)
      .classList.add("fa-check-circle");
    document
      .querySelector(`#grupo__${campo} i`)
      .classList.remove("fa-times-circle");
    document
      .querySelector(`#grupo__${campo} .formulario__input-error`)
      .classList.remove("formulario__input-error-activo");
  } else {
    document
      .getElementById(`grupo__${campo}`)
      .classList.add("formulario__grupo-incorrecto");
    document
      .getElementById(`grupo__${campo}`)
      .classList.remove("formulario__grupo-correcto");
    document
      .querySelector(`#grupo__${campo} i`)
      .classList.add("fa-times-circle");
    document
      .querySelector(`#grupo__${campo} i`)
      .classList.remove("fa-check-circle");
    document
      .querySelector(`#grupo__${campo} .formulario__input-error`)
      .classList.add("formulario__input-error-activo");
  }
};

const validarPassword2 = () => {
  const inputPassword1 = document.getElementById("contra");
  const inputPassword2 = document.getElementById("contra2");

  if (inputPassword1.value !== inputPassword2.value) {
    document
      .getElementById(`grupo__password2`)
      .classList.add("formulario__grupo-incorrecto");
    document
      .getElementById(`grupo__password2`)
      .classList.remove("formulario__grupo-correcto");
    document
      .querySelector(`#grupo__password2 i`)
      .classList.add("fa-times-circle");
    document
      .querySelector(`#grupo__password2 i`)
      .classList.remove("fa-check-circle");
    document
      .querySelector(`#grupo__password2 .formulario__input-error`)
      .classList.add("formulario__input-error-activo");
  } else {
    document
      .getElementById(`grupo__password2`)
      .classList.remove("formulario__grupo-incorrecto");
    document
      .getElementById(`grupo__password2`)
      .classList.add("formulario__grupo-correcto");
    document
      .querySelector(`#grupo__password2 i`)
      .classList.remove("fa-times-circle");
    document
      .querySelector(`#grupo__password2 i`)
      .classList.add("fa-check-circle");
    document
      .querySelector(`#grupo__password2 .formulario__input-error`)
      .classList.remove("formulario__input-error-activo");
  }
};

inputs.forEach((input) => {
  input.addEventListener("keyup", validarFormulario);
  input.addEventListener("blur", validarFormulario);
});
