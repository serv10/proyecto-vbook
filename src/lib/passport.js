const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const pool = require('../database');
const helpers = require('../lib/helpers');

passport.use('local.login', new LocalStrategy({
    usernameField:'correo_electronico',
    passwordField:'password',
    passReqToCallback:true
}, async(req, correo_electronico, password, done)=>{
    console.log(req.body);
    const rows = await pool.query('SELECT * FROM persona where correo_electronico=?',[correo_electronico]);
    if(rows.length > 0){
        const usuario = rows[0];
        const validPassword = await helpers.comparaPassword(password, usuario.password);
        if(validPassword){
            done(null, usuario, req.flash('success', 'Bienvenido ' + usuario.nombre));
            console.log(password);
            console.log(usuario.password);
        }else{
            done(null, false, req.flash('message', 'Contraseña incorrecta'));
            console.log('b');
        }
    }else{
        return done(null, false, req.flash('message', 'Usuario no existe'));
        console.log(rows.length);
    }
}));

passport.use('local.registro', new LocalStrategy({
    usernameField: 'correo_electronico',
    passwordField: 'password',
    passReqToCallback: true
}, async(req, correo_electronico, password, done)=>{
    const {
        dni,
        nombre,
        apellidoPaterno,
        apellidoMaterno,
        direccion,
        telefono,
        genero,
        fecha_nac,
        foto,
        id_pais = 1, id_region=1, id_distrito=1005
    } = req.body;    
    const nuevoUsuario ={
        dni,
        nombre,
        apellidoPaterno,
        apellidoMaterno,
        direccion,
        telefono,
        correo_electronico,
        password,
        genero,
        fecha_nac,
        foto,
        id_pais,
        id_region,
        id_distrito 
    };
    nuevoUsuario.password = await helpers.encryptPassword(password);
    await pool.query('INSERT INTO PERSONA SET ?', [nuevoUsuario]);
    //const result
    return done(null, nuevoUsuario);
}));

passport.serializeUser((usuario, done)=>{
    done(null, usuario.dni);
})

passport.deserializeUser(async(dni, done)=>{
    const fila = await pool.query('SELECT * FROM PERSONA WHERE DNI=?', [dni]);
    done(null, fila[0]);
})