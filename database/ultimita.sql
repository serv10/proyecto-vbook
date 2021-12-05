create database vbook;
use vbook;

CREATE TABLE Pais(
id_pais int not null auto_increment,
des_pais varchar(50) not null,
primary key (id_pais));

CREATE TABLE Region(
id_region int not null auto_increment,
des_region varchar(50) not null,
id_pais int not null,
primary key (id_region),
foreign key (id_pais) REFERENCES PAIS(id_pais));

CREATE TABLE Distrito(
id_Distrito int not null,
des_Distrito varchar(50) not null,
id_pais int not null,
id_region int not null,
primary key auto_increment (id_Distrito),
foreign key (id_pais) REFERENCES Pais(id_Pais),
foreign key (id_region) REFERENCES Region(id_region));

create table persona(
dni char(8) not null,
nombre varchar(50) not null,
apellidoPaterno varchar(50) not null,
apellidoMaterno varchar(50) not null,
direccion varchar(100),
telefono char(9),
correo_electronico varchar(100) not null,
password varchar(18) not null,
genero char(1),
fecha_nac date,
foto varchar(200),
id_pais int not null,
id_region int not null,
id_distrito int not null,
primary key auto_increment (dni),
foreign key (id_pais) references pais(id_pais),
foreign key (id_region) references region(id_region),
foreign key (id_distrito) references distrito(id_distrito));

create table cuenta(
idCuenta int not null auto_increment,
tipo char(1) not null,
estado boolean not null,
dni char(8) not null,
primary key (idCuenta),
foreign key (dni) references persona(dni));

create table genero(
idGenero int not null auto_increment ,
nombre varchar(50) not null,
primary key (idGenero));

/*create table autor(
idAutor int not null,
nombre varchar(50) not null,
apellidoPaterno varchar(50) not null,
apellidoMaterno varchar(50) not null,
idLibro int not null,
primary key auto_increment (idAutor),
foreign key (idLibro) references libro(idLibro));*/

create table especie(
idEspecie int not null auto_increment ,
nombre varchar(50) not null,
idGenero int not null,
primary key (idEspecie),
foreign key (idGenero) references genero(idGenero));

create table libro(
idLibro int not null auto_increment,
titulo varchar(100) not null,
fechaSubida date not null,
descripcion varchar(500),
stock int not null,
precio double not null,
autor varchar(100) not null,
calificacion char(1),
estado boolean not null,
idGenero int not null,
idEspecie int not null,
dni char(8) not null,
primary key (idLibro),
foreign key (idGenero) references Genero(idGenero),
foreign key (idEspecie) references Especie(idEspecie),
foreign key (dni) references persona(dni));

create table carrito(
idCarrito int not null auto_increment,
cantidad int not null,
idLibro int not null,
dni char(8) not null,
primary key (idCarrito),
foreign key (idLibro) references libro(idLibro),
foreign key (dni) references persona(dni));

create table transaccion_compra(
idTransaccion int not null auto_increment,
fecha date not null,
dni char(8) not null,
montoTotal DECIMAL(2) NOT NULL,
idLibro int not null,
idCarrito int not null,
primary key (idTransaccion),
foreign key (dni) references persona(dni),
foreign key (idLibro) references libro(idLibro),
foreign key (idCarrito) references carrito(idCarrito));

create table comentario(
idComentario int not null auto_increment,
descripcion varchar(500) not null,
fecha date not null,
dni char(7) not null,
idLibro int not null,
primary key (idComentario),
foreign key (dni) references persona(dni),
foreign key (idLibro) references libro(idLibro));

/*
create table editorial(
idEditorial int not null,
nombre varchar(50) not null,
idLibro int not null,
primary key auto_increment (idEditorial),
foreign key (idLibro) references libro(idLibro));
*/

create table LibroPublicacion(
idLibroPublicacion int not null auto_increment,
idLibro int not null,
dni char(8) not null,
primary key (idLibroPublicacion),
foreign key (idLibro) references libro(idLibro),
foreign key (dni) references persona(dni));

create table promociones(
idPromociones int not null auto_increment,
idLibropublicacion int not null,
dia int not null,
primary key (idPromociones),
foreign key (idLibroPublicacion) references LibroPublicacion(idLibroPublicacion));

create table denuncia(
idDenuncia int not null auto_increment,
descripcion int not null,
estado bool not null,
idLibro int not null,
dni char(8) not null,
primary key (idDenuncia),
foreign key (idLibro) references libro(idLibro),
foreign key (dni) references persona(dni));

create table UsuarioRedSocial(
dni char(8) not null,
link_wsp varchar(200),
link_fb varchar(200),
link_twt varchar(200),
link_ig varchar(200),
link_wtp varchar(200),
foreign key (dni) references persona(dni));

create table ImagenLibro(
idLibro int not null,
imagen blob not null,
foreign key (idLibro) references Libro(idLibro));

create table Ayuda(
idAyuda int not null,
mensaje varchar (500) not null,
dni char(8) not null,
foreign key (dni) references persona(dni));

insert into persona (
	dni,
	nombre,
	apellidoPaterno,
	apellidoMaterno,
	correo_electronico,
	password,
	id_pais,
	id_region,
	id_distrito
) 
values (
	"71696804", 
	"Sebastian", 
	"Villanueva",
	"Ramos",
	"sebas.ramos@gmail.com",
	"contra123",
	1,
	1,
	1005
);

SELECT 
	p.dni, 
	p.nombre, 
	p.apellidoPaterno, 
	p.apellidoMaterno, 
	p.direccion, 
	p.telefono, 
	p.correo_electronico, 
	p.password, 
	p.genero, 
    p.usuario,
	DATE_format(p.fecha_nac, '%Y-%m-%d') as fecha, 
	pa.des_pais, 
	r.des_region, 
	d.id_distrito as codigodistrito, 
	d.des_distrito as distrito,
    rs.link_wsp as wsp,
	rs.link_fb as fb,
	rs.link_twt as twt,
	rs.link_ig as ig,
	rs.link_wtp as wtp
FROM persona p 
INNER JOIN pais pa 
	ON p.id_pais = pa.id_pais 
INNER JOIN region r 
	ON p.id_region = r.id_region 
INNER JOIN distrito d 
	ON p.id_distrito = d.id_distrito 
INNER JOIN UsuarioRedSocial rs 
	ON p.dni = rs.dni
WHERE p.dni = 71696805;

select 
	p.dni, 
	p.nombre, 
	p.apellidoPaterno, 
	p.apellidoMaterno, 
	p.direccion, p.telefono, 
	p.correo_electronico, 
	p.password, 
	p.genero, 
    p.foto,
    p.usuario,
	DATE_format(p.fecha_nac, '%Y-%m-%d') as fecha, 
	pa.des_pais as pais, 
	r.des_region, 
	d.id_distrito, 
	d.des_distrito,
    rs.link_wsp,
	rs.link_fb,
	rs.link_twt,
	rs.link_ig,
	rs.link_wtp
from persona p 
inner join pais pa 
	on p.id_pais = pa.id_pais 
inner join region r 
	on p.id_region = r.id_region 
inner join distrito d 
	on p.id_distrito = d.id_distrito 
INNER JOIN UsuarioRedSocial rs 
	ON p.dni = rs.dni
where correo_electronico="sebas_ramos_18@hotmail.com";

select *  from UsuarioRedSocial where dni = 71696805;

insert into UsuarioRedSocial (dni) values (71696805);
use vbook;
update persona set foto=null where dni = 71696805;
select*from persona;

/*update persona set
	nombre=?,
    apellidoPaterno=?,
    apellidoMaterno=?,
    direccion=?,
    telefono=?,
    correo_electronico=?,
    genero=?,
    usuario=?,
    fecha_nac=?,
    id_distrito=?
where 
	dni = ?;
*/   
select* from usuarioredsocial;

/*update usuarioredsocial set
	link_wsp=?,
    link_fb=?,
    link_twt=?,
    link_ig=?,
    link_wtp=?
where 
	dni = ?;
    */
    
    