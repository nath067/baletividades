// Importa o módulo Router do Express
const { Router } = require('express');

// Importa as funções getAtividades, postarAtividade, salvarAtividade, e atividadesSalvas do controlador 'atividadeController'
const { getAtividades, postarAtividade, salvarAtividade, atividadesSalvas } = require('../controller/atividadeController');

// Cria uma nova instância do roteador do Express
const router = Router();

// Define a rota POST para postar uma nova atividade
// Quando uma requisição POST é feita para '/postar/atividade', a função postarAtividade é chamada
router.post('/postar/atividade', postarAtividade);

// Define a rota GET para obter todas as atividades
// Quando uma requisição GET é feita para '/get/atividade', a função getAtividades é chamada
router.get('/get/atividade', getAtividades);

// Define a rota POST para salvar uma atividade
// Quando uma requisição POST é feita para '/salvar/atividade', a função salvarAtividade é chamada
router.post('/salvar/atividade', salvarAtividade);

// Define a rota GET para obter atividades salvas de um usuário específico
// Quando uma requisição GET é feita para '/atividade/salva/:usuario_id', a função atividadesSalvas é chamada, onde ':usuario_id' é um parâmetro de rota que representa o ID do usuário
router.get('/atividade/salva/:usuario_id', atividadesSalvas);

// Exporta o roteador para ser usado em outros módulos da aplicação
module.exports = router;
