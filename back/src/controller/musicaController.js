// Importa a conexão com o banco de dados
const connection = require('../config/db');
const fs = require('fs');
const path = require('path');

// Define o caminho para o diretório de upload
const uploadPath = path.join(__dirname, '..', 'uploads', 'musicas');
if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath);

// Função para fazer upload de uma nova música
async function postarMusica(request, response) {
    if (!request.files || !request.files.arquivo) {
        return response.status(400).json({ success: false, message: "Nenhum arquivo anexado" });
    }

    const musicaArquivo = request.files.arquivo;
    const nomeArquivo = Date.now() + path.extname(musicaArquivo.name);

    musicaArquivo.mv(path.join(uploadPath, nomeArquivo), (erro) => {
        if (erro) {
            return response.status(500).json({ success: false, message: "Erro ao salvar o arquivo" });
        }

        const { nome, artista } = request.body;
        const params = [nome, artista, nomeArquivo];
        const query = 'INSERT INTO musica(nome, artista, arquivo) VALUES(?,?,?)';

        connection.query(query, params, (err, results) => {
            if (err) {
                return response.status(500).json({ success: false, message: "Erro ao salvar no banco de dados", error: err });
            }
            response.status(201).json({ success: true, message: "Música salva com sucesso!", data: results });
        });
    });
}

// Função para obter todas as músicas
async function getMusicas(request, response) {
    const query = 'SELECT * FROM musica';
    connection.query(query, (err, results) => {
        if (err) {
            return response.status(500).json({ success: false, message: "Erro ao buscar músicas", error: err });
        }
        response.status(200).json({ success: true, message: "Músicas obtidas com sucesso", data: results });
    });
}

module.exports = { postarMusica, getMusicas };
