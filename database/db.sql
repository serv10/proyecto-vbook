create database vbook;
use vbook;

CREATE TABLE Pais(
id_pais int not null,
des_pais varchar(50) not null,
primary key auto_increment (id_pais));

CREATE TABLE Region(
id_region int not null,
des_region varchar(50) not null,
id_pais int not null,
primary key auto_incremente (id_region),
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
apellidoMaterno varchar(50),
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
idCuenta int not null,
tipo char(1) not null,
estado boolean not null,
dni char(8) not null,
primary key auto_increment (idCuenta),
foreign key (dni) references persona(dni));

create table libro(
idLibro int not null,
titulo varchar(100) not null,
fechaSubida date not null,
descripcion varchar(500) not null,
stock int not null,
precio double not null,
calificacion char(1),
estado boolean not null,
primary key auto_increment (idLibro));

create table carrito(
idCarrito int not null,
cantidad int not null,
idLibro int not null,
dni char(8) not null,
primary key auto_increment (idCarrito),
foreign key (idLibro) references libro(idLibro),
foreign key (dni) references persona(dni));

create table transaccion_compra(
idTransaccion int not null,
fecha date not null,
dni char(8) not null,
montoTotal DECIMAL(2) NOT NULL,
idLibro int not null,
idCarrito int not null,
primary key auto_increment (idTransaccion),
foreign key (dni) references persona(dni),
foreign key (idLibro) references libro(idLibro),
foreign key (idCarrito) references carrito(idCarrito));

create table comentario(
idComentario int not null,
descripcion varchar(500) not null,
fecha date not null,
dni char(7) not null,
idLibro int not null,
primary key auto_increment (idComentario),
foreign key (dni) references persona(dni),
foreign key (idLibro) references libro(idLibro));

create table editorial(
idEditorial int not null,
nombre varchar(50) not null,
idLibro int not null,
primary key auto_increment (idEditorial),
foreign key (idLibro) references libro(idLibro));

create table genero(
idGenero int not null,
nombre varchar(50) not null,
idLibro int not null,
primary key auto_increment (idGenero),
foreign key (idLibro) references libro(idLibro));

create table autor(
idAutor int not null,
nombre varchar(50) not null,
apellidoPaterno varchar(50) not null,
apellidoMaterno varchar(50) not null,
idLibro int not null,
primary key auto_increment (idAutor),
foreign key (idLibro) references libro(idLibro));

create table especie(
idEspecie int not null,
nombre varchar(50) not null,
idLibro int not null,
idGenero int not null,
primary key auto_increment (idGenero),
foreign key (idLibro) references libro(idLibro),
foreign key (idGenero) references genero(idGenero));

create table LibroPublicacion(
idLibroPublicacion int not null,
idLibro int not null,
dni char(8) not null,
primary key auto_increment (idLibroPublicacion),
foreign key (idLibro) references libro(idLibro),
foreign key (dni) references persona(dni));

create table promociones(
idPromociones int not null,
idLibropublicacion int not null,
dia int not null,
primary key auto_increment (idPromociones),
foreign key (idLibroPublicacion) references LibroPublicacion(idLibroPublicacion));

create table denuncia(
idDenuncia int not null,
descripcion int not null,
estado bool not null,
idLibro int not null,
dni char(8) not null,
primary key auto_increment (idDenuncia),
foreign key (idLibro) references libro(idLibro),
foreign key (idLibro) references libro(idLibro));


