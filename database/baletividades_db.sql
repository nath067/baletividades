CREATE DATABASE baletividade_bd;
USE baletividade_bd;

CREATE TABLE usuario(
	id INT PRIMARY KEY auto_increment,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    nome_usuario VARCHAR(255) NOT NULL,
    senha VARCHAR(255) NOT NULL,
    foto_perfil VARCHAR(255)
);

drop table usuario;

CREATE TABLE categorias(
	salvos_atividade VARCHAR(255),
    foto_categoria VARCHAR(255),
    foto_atividade VARCHAR(255),
    salvos_musica VARCHAR(255),
    foto_musica VARCHAR(255)
);

CREATE TABLE salvos (
	id INT PRIMARY KEY AUTO_INCREMENT,
	atividade_id int,
    id_usuario int
);

drop table salvos;

CREATE TABLE avaliacao (
	id int primary key auto_increment,
    nota_avaliacao varchar(255),
    qtd_avaliacao varchar(255),
    id_usuario int,
    id_atividade int
);

CREATE TABLE atividade (
	id int primary key auto_increment,
    nome varchar(255),
    nivel int,
    imagem varchar(255)
);

drop table atividade;
select * from atividade;
select * from salvos;
select * from usuario;

delete from atividade where id > 0;