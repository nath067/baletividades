CREATE DATABASE baletividade_bd;
USE baletividade_bd;
drop database baletividade_bd;

CREATE TABLE usuario(
    id INT PRIMARY KEY auto_increment,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    nome_usuario VARCHAR(255) NOT NULL,
    senha VARCHAR(255) NOT NULL,
    foto_perfil VARCHAR(255)
);

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

CREATE TABLE atividade (
    id int primary key auto_increment,
    nome varchar(255),
    nivel int,
    imagem varchar(255),
    descricao longtext,
    tipo_atividade VARCHAR(255)
);

CREATE TABLE atividade_centro (
    id int primary key auto_increment,
    nome varchar(255),
    nivel int,
    imagem varchar(255),
    descricao longtext
);

CREATE TABLE musica (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255),
    artista VARCHAR(255),
    arquivo VARCHAR(255)
);

select * from musica;
select * from usuario;
select * from atividade;
select * from salvos;