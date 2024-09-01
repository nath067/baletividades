// Importa o módulo Router do Express
const { Router } = require('express');

// Importa a função avaliacao do controlador 'avaliacaoController'
const { avaliacao } = require('../controller/avaliacaoController');

// Cria uma nova instância do roteador do Express
const router = Router();

// Define a rota POST para armazenar uma nova avaliação
// Quando uma requisição POST é feita para '/store/avaliacao', a função avaliacao é chamada
router.post('/store/avaliacao', avaliacao);

// Exporta o roteador para ser usado em outros módulos da aplicação
module.exports = router;
