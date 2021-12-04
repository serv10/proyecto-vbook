const express = require("express");
const router = express.Router();
const pool = require("../database");
const { isLoggedIn } = require("../lib/auth");
const helpers = require("../lib/helpers");
const path = require("path");

const expresiones = {
  password: /^.{4,10}$/, // 4 a 10 digitos.
};

router.get("/add", isLoggedIn, (req, res) => {
  res.render("links/add");
});

router.post("/add", isLoggedIn, async (req, res) => {
  const {
    titulo,
    fechasubida = "1993-09-11",
    descripcion,
    stock,
    precio,
    autor,
    estado = 1,
    idGenero = 4,
    idEspecie = 13,
    dni,
  } = req.body;
  const nuevoLibro = {
    titulo,
    fechasubida,
    descripcion,
    stock,
    precio,
    autor,
    estado,
    idGenero,
    idEspecie,
    dni: req.user.dni,
  };
  await pool.query("INSERT INTO LIBRO SET ?", [nuevoLibro]);
  req.flash("success", "Libro guardado satisfactoriamente");
  res.redirect("/links/mislibros");
});

router.get("/mislibros", isLoggedIn, async (req, res) => {
  const libro = await pool.query(
    "SELECT * FROM LIBRO WHERE ESTADO=1 and dni = ?",
    [req.user.dni]
  );
  res.render("links/mislibros", { libro });
});

router.get("/change/:idLibro", isLoggedIn, async (req, res) => {
  const { idLibro } = req.params;
  await pool.query("update libro set estado = 2 where idLibro=? and dni=?", [
    idLibro,
    req.user.dni,
  ]);
  req.flash("success", "El libro ha sido desactivado");
  res.redirect("/links/mislibros");
});

router.get("/editbook/:idLibro", isLoggedIn, async (req, res) => {
  const { idLibro } = req.params;
  const libro = await pool.query(
    "select*from libro where idLibro=? and dni=?",
    [idLibro, req.user.dni]
  );
  res.render("links/editbook", { editbook: libro[0] });
});

router.post("/editbook/:idLibro", isLoggedIn, async (req, res) => {
  const { idLibro } = req.params;
  const { titulo, descripcion, stock, precio, autor } = req.body;
  const actLibro = {
    titulo,
    descripcion,
    stock,
    precio,
    autor,
  };
  console.log(actLibro);
  await pool.query("update libro set ? where idLibro = ?", [actLibro, idLibro]);
  req.flash("success", "Libro actualizado satisfactoriamente");
  res.redirect("/links/mislibros");
});

router.get("/edituser/datos/:dni", isLoggedIn, async (req, res) => {
  const { dni } = req.params;
  const user = await pool.query("select*from persona where dni=?", [dni]);
  const distrito = await pool.query(
    "select id_distrito, des_distrito from distrito"
  );
  res.render("links/modificarperfil", { edituser: user[0], distrito });
});

router.post("/edituser/datos/:dni", isLoggedIn, async (req, res) => {
  const { dni } = req.params;
  const {
    nombre,
    apellidoPaterno,
    apellidoMaterno,
    direccion,
    telefono,
    correo_electronico,
    genero,
    fecha_nac,
    wsp,
    twt,
    ig,
    fb,
    wtp,
    usuario,
    id_pais = 1,
    id_region = 1,
    id_distrito,
  } = req.body;

  const actDatosUser = {
    nombre,
    apellidoPaterno,
    apellidoMaterno,
    direccion,
    telefono,
    correo_electronico,
    genero,
    fecha_nac,
    id_pais,
    id_region,
    id_distrito,
    usuario,
  };

  const linksUser = {
    wsp,
    twt,
    ig,
    fb,
    wtp,
  };

  let foto;
  let subirDireccion;

  if (req.files && Object.keys(req.files).length != 0) {
    foto = req.files.foto;
    subirDireccion = path.join(__dirname, "../", "public", "upload", foto.name);

    foto.mv(subirDireccion, async () => {
      await pool.query("UPDATE persona SET foto=? WHERE dni=?", [
        foto.name,
        dni,
      ]);
    });
  }

  /* console.log(actDatosUser);
  console.log(linksUser);

  /* console.log(actDatosUser);
    console.log(dni); */

  /* await pool.query("UPDATE persona SET nombre=? WHERE dni=?", [
      nombre,
      req.params.dni,
    ]);
    */
  /* req.flash("message", "Datos actualizados satisfactoriamente"); */
  res.redirect(dni);
});

router.post("/edituser/contra/:dni", isLoggedIn, async (req, res) => {
  const { dni } = req.params;
  const { contraActual, contraNueva, contraConfirmar } = req.body;

  const row = await pool.query("SELECT * FROM persona WHERE dni=?", [dni]);

  const user = row[0];

  const validarPassword = await helpers.comparaPassword(
    contraActual,
    user.password
  );

  if (validarPassword) {
    if (expresiones.password.test(contraNueva)) {
      if (contraNueva === contraConfirmar) {
        /* const contraEncriptada = await helpers.encryptPassword(contraNueva);
        await pool.query("UPDATE persona SET password=? WHERE dni=?", [
          contraEncriptada,
          dni,
        ]);
        console.log(contraEncriptada); */
        req.flash("success", "Contraseña actualizada satisfactoriamente");
        console.log("Exito");
      } else {
        req.flash("message", "Las contraseñas no son iguales");
        console.log("Las contraseñas no son iguales");
      }
    } else {
      req.flash("message", "Error en los campos");
      console.log("Error en los campos");
    }
  } else {
    req.flash("message", "La contraseña actual no coincide");
    console.log("La contraseña actual no coincide");
  }

  res.redirect("back");
});

module.exports = router;
