// Importa a conexão com o banco de dados configurada em '../config/db'
const connection = require('../config/db');

// Carrega as variáveis de ambiente a partir de um arquivo .env
const dotenv = require('dotenv').config();

// Importa o módulo 'fs' para manipulação de arquivos e 'path' para manipulação de caminhos de arquivo
const fs = require('fs');
const path = require('path');

// Define o caminho do diretório 'uploads', que está um nível acima do diretório atual
const uploadPath = path.join(__dirname, '..', 'uploads');

// Verifica se o diretório 'uploads' existe, se não existir, cria-o
if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath);
}

async function postarAtividade(request, response) {
    // Verifica se há arquivos anexados na requisição
    if (!request.files) {
        return response.status(400).json({
            success: false,
            message: "Não foi anexada a foto"
        });
    }

    // Obtém o arquivo de imagem anexado e define um novo nome de arquivo com base na data atual
    const imagem = request.files.imagem;
    const imagemNome = Date.now() + path.extname(imagem.name);

    // Move o arquivo de imagem para o diretório 'uploads'
    imagem.mv(path.join(uploadPath, imagemNome), (erro) => {
        // Caso ocorra um erro ao mover o arquivo, retorna uma resposta de erro
        if (erro) {
            return response.status(400).json({
                success: false,
                message: "Erro ao mover o arquivo"
            });
        }

        // Define os parâmetros a serem inseridos no banco de dados
        const params = Array(
            request.body.nome,   // Nome da atividade
            request.body.nivel,  // Nível da atividade
            imagemNome           // Nome do arquivo de imagem
        );

        // Define a query SQL para inserir uma nova atividade no banco de dados
        const query = 'INSERT INTO atividade(nome, nivel, imagem) VALUES(?,?,?)';

        // Executa a query no banco de dados
        connection.query(query, params, (err, results) => {
            if (results) {
                response
                    .status(201)
                    .json({
                        success: true,
                        message: "Sucesso!",
                        data: results
                    });
            } else {
                response
                    .status(400)
                    .json({
                        success: false,
                        message: "Ops, deu problema!",
                        data: err
                    });
            }
        });
    });
}

async function getAtividades(request, response) {
    // Define a query SQL para buscar todas as atividades
    const query = 'SELECT * FROM atividade';

    // Executa a query no banco de dados
    connection.query(query, (err, results) => {
        if (results) {
            response.status(200).json({
                success: true,
                message: "Sucesso no get!",
                data: results
            });
        } else {
            response.status(400).json({
                success: false,
                message: "Erro!",
                sql: err
            });
        }
    });
}

async function salvarAtividade(request, response) {
    // Obtém os IDs da atividade e do usuário do corpo da requisição
    const atividadeId = request.body.atividade_id;
    const usuarioId = request.body.usuario_id;

    // Define os parâmetros a serem inseridos na tabela 'salvos'
    const params = [
        atividadeId,
        usuarioId
    ];

    // Define a query SQL para salvar a atividade para o usuário
    const query = 'INSERT INTO salvos(atividade_id, id_usuario) VALUES(?,?)';

    // Executa a query no banco de dados
    connection.query(query, params, (err, results) => {
        if (err) {
            response.status(400).json({ 
                success: false, 
                message: "Erro ao salvar atividade!"
            });
        } else {
            response.status(201).json({ 
                success: true, 
                message: "Atividade salva com sucesso!" 
            });
        }
    });
}

async function atividadesSalvas(request, response) {
    // Obtém o ID do usuário dos parâmetros da rota
    const usuarioId = request.params.usuario_id;

    // Define a query SQL para buscar as atividades salvas pelo usuário, ordenadas por nível
    const query = `SELECT a.nome, a.nivel, a.imagem FROM salvos s 
                   INNER JOIN atividade a ON s.atividade_id = a.id 
                   WHERE s.id_usuario = ? ORDER BY a.nivel ASC`;

    // Executa a query no banco de dados
    connection.query(query, [usuarioId], (err, results) => {
        if (err) {
            return response.status(400).json({ 
                success: false, 
                message: "Erro ao buscar atividades salvas!",
                sql: err
            });
        }

        response.status(200).json({ 
            success: true, 
            message: "Atividades salvas obtidas com sucesso!",
            data: results
        });
    });
}

// Exporta as funções para serem usadas em outros módulos
module.exports = {
    postarAtividade,
    getAtividades,
    salvarAtividade,
    atividadesSalvas
};
