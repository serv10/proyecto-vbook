use vbook;
/*desc cuenta;
desc Genero;
desc Editorial;
desc Especie;
desc Libro;
desc Persona;
desc Transaccion_Compra;
desc Pais;
desc Region;
desc Distrito;
desc Carrito;
desc LibroPublicacion;
desc Promociones;
desc Denuncia;*/

use vbook;

SELECT*from genero;

 INSERT INTO GENERO(nombre) VALUES ('Epico');
 INSERT INTO GENERO(nombre)  VALUES ('Lirico'); 
 INSERT INTO GENERO(nombre)  VALUES ('Dramatico'); 
 INSERT INTO GENERO(nombre)  VALUES ('Narrativo'); 
 INSERT INTO GENERO(nombre)  VALUES ('Expositivo');

select * from especie;
 INSERT INTO Especie(nombre, idGenero) VALUES ('Epopeya',1),('Cantar de gesta',1);
 INSERT INTO Especie(nombre, idGenero) VALUES ('Oda',2),('Elegía',2),('Egloga',2),('Madrigal',2),('Epigrama',2), ('Epístola',2);
 INSERT INTO Especie(nombre, idGenero) VALUES ('Tragedia',3),('Comedia',3), ('Drama',3);
 INSERT INTO Especie(nombre, idGenero) VALUES ('Cuento',4),('Novela',4), ('Fabula',4);
 INSERT INTO Especie(nombre, idGenero) VALUES ('Ensayo',5);
 
 -- pais, region, distrito
 
 INSERT INTO PAIS(des_pais) VALUES ('Perú');
INSERT INTO region(des_region, id_pais) VALUES
('Lima',1);
/*(2, 'AMAZONAS',1),
(3, 'ANCASH',1),
(4, 'APURIMAC',1),
(5, 'AREQUIPA',1),
(6, 'AYACUCHO',1),
(7, 'CAJAMARCA',1),
(8, 'CALLAO',1),
(9, 'CUSCO',1),
(10, 'HUANCAVELICA',1),
(11, 'HUANUCO',1),
(12, 'ICA',1),
(13, 'JUNIN',1),
(14, 'LA LIBERTAD',1),
(15, 'LAMBAYEQUE',1),
(16, 'LORETO',1),
(17, 'MADRE DE DIOS',1),
(18, 'MOQUEGUA',1),
(19, 'PASCO',1),
(20, 'PIURA',1),
(22, 'PUNO',1),
(22, 'SAN MARTIN',1),
(23, 'TACNA',1),
(24, 'TUMBES',1),
(25, 'UCAYALI',1);*/

INSERT INTO Distrito VALUES
(999,"NO ESPECIFICADO",1,1),
(1000, 'LIMA',1, 1),
(1001, 'ANCON',1,1),
(1002, 'ATE',1,1),
(1003, 'BARRANCO',1,1),
(1004, 'BRENA',1, 1),
(1005, 'CARABAYLLO',1,1),
(1006, 'CHACLACAYO',1,1),
(1007, 'CHORRILLOS',1,1),
(1008, 'CIENEGUILLA',1, 1),
(1009, 'COMAS',1,1),
(1010, 'EL AGUSTINO',1,1),
(1011, 'INDEPENDENCIA',1,1),
(1012, 'JESUS MARIA',1, 1),
(1013, 'LA MOLINA',1,1),
(1014, 'LA VICTORIA',1,1),
(1015, 'LINCE',1,1),
(1016, 'LOS OLIVOS',1, 1),
(1017, 'LURIGANCHO',1,1),
(1018, 'LURIN',1,1),
(1019, 'MAGDALENA DEL MAR',1,1),
(1020, 'MAGDALENA VIEJA',1, 1),
(1021, 'MIRAFLORES',1,1),
(1022, 'PACHACAMAC',1,1),
(1023, 'PUCUSANA',1,1),
(1024, 'PUENTE PIEDRA',1, 1),
(1025, 'PUNTA HERMOSA',1,1),
(1026, 'PUNTA NEGRA',1,1),
(1027, 'RIMAC',1,1),
(1028, 'SAN BARTOLO',1, 1),
(1029, 'SAN BORJA',1,1),
(1030, 'SAN ISIDRO',1,1),
(1031, 'SAN JUAN DE LURIGANCHO',1,1),
(1032, 'SAN JUAN DE MIRAFLORES',1, 1),
(1033, 'SAN LUIS',1,1),
(1034, 'SAN MARTIN DE PORRES',1,1),
(1035, 'SAN MIGUEL',1,1),
(1036, 'SANTA ANITA',1, 1),
(1037, 'SANTA MARIA DEL MAR',1,1),
(1038, 'SANTA ROSA',1,1),
(1039, 'SANTIAGO DE SURCO',1,1),
(1040, 'SURQUILLO',1, 1),
(1041, 'VILLA EL SALVADOR',1,1),
(1042, 'VILLA MARIA DEL TRIUNFO',1,1);
 /*
  select*from persona where dni = '4158999';
  INSERT INTO PERSONA VALUES ('47900556', 'Jose', 'Calle', 'Soraluz', 'Jr. Bernardo Monteagudo 200', '920853912',
  'josebcalle2014@gmail.com', '123','M','1993-09-11','eee',1,1,1009);
  select*from libro;
  
  INSERT INTO LIBRO(titulo, fechasubida, descripcion, stock, precio, autor, estado, idGenero, idEspecie, dni)
  values (?,2021-11-21,?,?,?,?,1,4,13,47900556);
  
  update libro set estado =1 where idLibro=9;
 select*from persona;*/