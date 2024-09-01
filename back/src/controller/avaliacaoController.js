// Importa a conexão com o banco de dados configurada em '../config/db'
const connection = require('../config/db');

// Carrega as variáveis de ambiente a partir de um arquivo .env
const dotenv = require('dotenv').config();

async function avaliacao(request, response) {
    
    // Cria um array com os parâmetros a serem inseridos no banco de dados, extraídos do corpo da requisição
    const params = Array(
        request.body.nota_avaliacao,  // Nota da avaliação
        request.body.qtd_avaliacao,   // Quantidade de avaliações
    );

    // Define a query SQL para inserir uma nova avaliação
    const query = 'INSERT INTO avaliacao(nota_avaliacao, qtd_avaliacao) VALUES(?, ?)';

    // Executa a query no banco de dados
    connection.query(query, params, (err, results) => {
        // Se a operação for bem-sucedida, responde com status 201 e uma mensagem de sucesso
        if (results) {
            response
                .status(201)
                .json({
                    success: true,
                    message: "Avaliação adicionada com sucesso!",
                    data: results
                });
        } else {
            // Se houver um erro, responde com status 400 e uma mensagem de erro
            response
                .status(400)
                .json({
                    success: false,
                    message: "Erro ao adicionar a avaliação!",
                    data: err
                });
        }
    });
}

// Exporta a função avaliacao para ser usada em outros módulos
module.exports = {
    avaliacao
};