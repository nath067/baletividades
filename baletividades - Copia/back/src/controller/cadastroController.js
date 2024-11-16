// Importa a conexão com o banco de dados configurada em '../config/db'
const connection = require('../config/db');

// Carrega as variáveis de ambiente a partir de um arquivo .env
const dotenv = require('dotenv').config();

async function storeUsuario(request, response) {
    // Define os parâmetros a serem inseridos no banco de dados a partir do corpo da requisição
    const params = [
        request.body.nome,
        request.body.email,
        request.body.nome_usuario,
        request.body.senha
    ];

    // Define a query SQL para inserir um novo usuário
    const query = 'INSERT INTO usuario(nome, email, nome_usuario, senha) VALUES(?,?,?,?)';

    // Executa a query no banco de dados
    connection.query(query, params, (err, results) => {
        console.log(err, results);
        // Se a operação for bem-sucedida, responde com status 201 e mensagem de sucesso
        if (results) {
            response.status(201).json({
                success: true,
                message: "Sucesso!",
                data: results
            });
        } else {
            // Se houver um erro, responde com status 400 e mensagem de erro
            response.status(400).json({
                success: false,
                message: "Ops, deu problema!",
                data: err
            });
        }
    });
}

async function loginUsuario(request, response) {
    // Define os parâmetros a serem comparados no banco de dados a partir do corpo da requisição
    const params = [
        request.body.email,
        request.body.senha,
    ];

    // Define a query SQL para buscar um usuário com o email e senha fornecidos
    const query = "SELECT id, email, nome_usuario, senha FROM usuario WHERE email = ? AND senha = ?";

    // Executa a query no banco de dados
    connection.query(query, params, (err, results) => {
        console.log(err, results);
        // Se a operação for bem-sucedida, responde com status 201 e mensagem de sucesso
        if (results) {
            response.status(201).json({
                success: true,
                message: "Sucesso!",
                data: results
            });
        } else {
            // Se houver um erro, responde com status 400 e mensagem de erro
            response.status(400).json({
                success: false,
                message: "Ops, deu problema!",
                data: err
            });
        }
    });
}

// Exporta as funções storeUsuario e loginUsuario para serem usadas em outros módulos
module.exports = {
    storeUsuario,
    loginUsuario
};
