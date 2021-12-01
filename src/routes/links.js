const express = require("express");
const router = express.Router();
const pool = require("../database");
const { isLoggedIn } = require("../lib/auth");
const helpers = require("../lib/helpers");

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

router.get("/edituser/:dni", isLoggedIn, async (req, res) => {
  const { dni } = req.params;
  const user = await pool.query("select*from persona where dni=?", [dni]);
  const distrito = await pool.query(
    "select id_distrito, des_distrito from distrito"
  );
  res.render("links/modificarperfil", { edituser: user[0], distrito });
});

router.post("/edituser/:dni", isLoggedIn, async (req, res) => {
  try {
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
      foto = "",
      id_pais = 1,
      id_region = 1,
      id_distrito = 1031,
    } = req.body;

    /* var { password = "123456" } = req.body;
    password = await helpers.encryptPassword(password); */

    const actDatosUser = {
      nombre,
      apellidoPaterno,
      apellidoMaterno,
      direccion,
      telefono,
      correo_electronico,
      genero,
      fecha_nac,
      foto,
      id_pais,
      id_region,
      id_distrito,
    };

    console.log(actDatosUser);
    console.log(dni);

    /* await pool.query("UPDATE persona SET nombre=? WHERE dni=?", [
      nombre,
      req.params.dni,
    ]);
    */
    req.flash("message", "Datos actualizados satisfactoriamente");
    res.redirect(dni);
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
