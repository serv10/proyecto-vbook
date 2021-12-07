const {expresiones} = require('../src/routes/links')

test(
    /*
    nombre:'José', 
    apellidos: 'Calle', 
    password: '123',
    correo: 'josebcalle2014@gmail.com',
    direccion: 'Jr. Bernardo Monteagudo 200', 
    celular: '920853912',
    usuario: 'Jose Calle'
    */
{},()=>{
    const result = expresiones('José', 
    'Calle', '123', 'josebcalle2014@gmail.com', 'Jr. Bernardo Monteagudo 200', 
    '920853912', 'Jose Calle')
    expect(result).toBe('José', 
    'Calle', '123', 'josebcalle2014@gmail.com', 'Jr. Bernardo Monteagudo 200', 
    '920853912', 'Jose Calle')
})