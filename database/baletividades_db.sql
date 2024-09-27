CREATE DATABASE baletividade_bd;
USE baletividade_bd;

CREATE TABLE usuario(
	id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    nome_usuario VARCHAR(255) NOT NULL,
    senha VARCHAR(255) NOT NULL,
    tipo_usuario varchar(255),
    foto_perfil VARCHAR(255)
);

select * from usuario;

CREATE TABLE categorias(
	salvos_atividade VARCHAR(255),
    foto_categoria VARCHAR(255),
    foto_atividade VARCHAR(255),
    salvos_musica VARCHAR(255),
    foto_musica VARCHAR(255)
);

CREATE TABLE salvos (
	id INT PRIMARY KEY AUTO_INCREMENT,
    nome varchar(255) NOT NULL,
    nivel varchar(255),
    img_atividade varchar(255) not null
);

drop table usuario;