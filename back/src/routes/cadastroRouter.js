// Importa o módulo Router do Express
const { Router } = require('express');

// Importa as funções storeUsuario e loginUsuario do controlador 'cadastroController'
const { storeUsuario, loginUsuario } = require('../controller/cadastroController');

// Cria uma nova instância do roteador do Express
const router = Router();

// Define a rota POST para armazenar um novo usuário
// Quando uma requisição POST é feita para '/store/usuario', a função storeUsuario é chamada
router.post('/store/usuario', storeUsuario);

// Define a rota POST para autenticação de um usuário
// Quando uma requisição POST é feita para '/login/usuario', a função loginUsuario é chamada
router.post('/login/usuario', loginUsuario);

// Exporta o roteador para ser usado em outros módulos da aplicação
module.exports = router;
