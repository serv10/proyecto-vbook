const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const pool = require("../database");
const helpers = require("../lib/helpers");

const expresiones = {
  nombre: /^[a-zA-ZÀ-ÿ\s]{1,50}$/, // Letras y espacios, pueden llevar acentos.
  password: /^.{4,10}$/, // 4 a 10 digitos.
  correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
  dni: /^[0-9]{8}$/, // 8 digitos.
};

passport.use(
  "local.login",
  new LocalStrategy(
    {
      usernameField: "correo_electronico",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, correo_electronico, password, done) => {
      const rows = await pool.query(
        "SELECT p.dni, p.nombre, p.apellidoPaterno, p.apellidoMaterno, p.direccion, p.telefono, p.correo_electronico, p.password, p.genero,p.foto,p.usuario, DATE_format(p.fecha_nac, '%Y-%m-%d') as fecha, pa.des_pais as pais, r.des_region, d.id_distrito, d.des_distrito,rs.link_wsp,rs.link_wsp as wsp,rs.link_fb as fb,rs.link_twt as twt,rs.link_ig as ig,rs.link_wtp as wtp fROM persona p INNER JOIN pais pa ON p.id_pais = pa.id_pais INNER JOIN region r ON p.id_region = r.id_region INNER JOIN distrito d ON p.id_distrito = d.id_distrito INNER JOIN UsuarioRedSocial rs ON p.dni = rs.dni WHERE correo_electronico=?",
        [correo_electronico]
      );
      if (rows.length > 0) {
        const usuario = rows[0];
        const validPassword = await helpers.comparaPassword(
          password,
          usuario.password
        );
        if (validPassword) {
          done(null, usuario);
        } else {
          done(
            null,
            false,
            req.flash("message", "Correo o Contraseña erróneo")
          );
        }
      } else {
        return done(null, false, req.flash("message", "Usuario no existe"));
      }
    }
  )
);

passport.use(
  "local.registro",
  new LocalStrategy(
    {
      usernameField: "correo_electronico",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, correo_electronico, password, done) => {
      const {
        dni,
        nombre,
        apellidoPaterno,
        password2,
        //fecha_nac =  '0000-00-00 00:00:00',
        id_pais = 4,
        id_region = 24,
        id_distrito = 999,
      } = req.body;

      const nuevoUsuario = {
        dni,
        nombre,
        apellidoPaterno,
        correo_electronico,
        password,
        //fecha_nac,
        id_pais,
        id_region,
        id_distrito,
      };

      const rows = await pool.query(
        "SELECT * FROM PERSONA WHERE correo_electronico = ? OR DNI = ?",
        [correo_electronico, dni]
      );

      if (
        !(
          expresiones.nombre.test(nombre) &&
          expresiones.nombre.test(apellidoPaterno) &&
          expresiones.password.test(password) &&
          expresiones.correo.test(correo_electronico) &&
          expresiones.dni.test(dni)
        )
      )
        return done(null, false, req.flash("message", "Campos erróneos"));
      else if (rows.length == 0) {
        if (password !== password2)
          return done(
            null,
            false,
            req.flash(
              "message",
              "Las contraseñas ingresadas no coinciden entre sí"
            )
          );
        else {
          nuevoUsuario.password = await helpers.encryptPassword(password);

          await pool.query("INSERT INTO PERSONA SET ?", [nuevoUsuario]);
          await pool.query("INSERT INTO UsuarioRedSocial (dni) VALUES (?)", [
            nuevoUsuario.dni,
          ]);

          return done(null, nuevoUsuario);
        }
      } else
        return done(
          null,
          false,
          req.flash("message", "Correo electronico o DNI ya existen")
        );
    }
  )
);

passport.serializeUser((usuario, done) => {
  done(null, usuario.dni);
});

passport.deserializeUser(async (dni, done) => {
  const fila = await pool.query(
    "SELECT p.dni, p.nombre, p.apellidoPaterno, p.apellidoMaterno, p.direccion, p.telefono, p.correo_electronico, p.password, case when p.genero = 'M' then 'Masculino' when p.genero = 'F' then 'Femenino' when p.genero = 'O' then 'Otro' end as genero, p.foto,p.usuario, DATE_format(p.fecha_nac, '%Y-%m-%d') as fecha, pa.des_pais, r.des_region, d.id_distrito as codigodistrito, d.des_distrito as distrito, rs.link_wsp as wsp,rs.link_fb as fb,rs.link_twt as twt,rs.link_ig as ig,rs.link_wtp as wtp FROM persona p INNER JOIN pais pa ON p.id_pais = pa.id_pais INNER JOIN region r ON p.id_region = r.id_region INNER JOIN distrito d ON p.id_distrito = d.id_distrito INNER JOIN UsuarioRedSocial rs ON p.dni = rs.dni WHERE p.dni = ?", [dni]
    //"CALL sp_PerfilUsuario (?)", [dni]    
  );
  //console.log(fila);
  done(null, fila[0]);
});

