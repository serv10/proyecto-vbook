const mysql = require('mysql');
const {promisify} = require('util');
const{database} = require("./keys");

const pool = mysql.createPool(database);
pool.getConnection((err, connection) =>{
    if(err){
        if(err.code === 'PROTOCOL_CONNECTION_CLOSE'){
            console.error('Base de ddatos cerrada');
        }
        if(err.code === 'ER_CON_COUNT_ERROR'){
            console.error('MUCHAS CONEXIONES A LA BASE DE DATOS');
        }
        if(err.code === 'ECONNEREFUSED'){
            console.error('DATABASE CONNECTION WAS REFUSED');
        }
    }

    if (connection) connection.release();
    console.log('La base de datos está conectada');
    return;
})

//Convirtiendo promesas
pool.query = promisify(pool.query);

module.exports = pool;

