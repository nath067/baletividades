// Importa o módulo Router do Express
const { Router } = require('express');

// Importa as funções storeUsuario e loginUsuario do controlador 'cadastroController'
const { storeUsuario, loginUsuario } = require('../controller/cadastroController');

// Cria uma nova instância do roteador do Express
const router = Router();

/**
 * @swagger
 * /store/usuario:
 *   post:
 *     summary: Armazena um novo usuário
 *     description: Cadastra um novo usuário no sistema
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 description: Nome do usuário
 *               email:
 *                 type: string
 *                 description: Email do usuário
 *               senha:
 *                 type: string
 *                 description: Senha do usuário
 *     responses:
 *       201:
 *         description: Usuário cadastrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.post('/store/usuario', storeUsuario);

/**
 * @swagger
 * /login/usuario:
 *   post:
 *     summary: Autenticação de usuário
 *     description: Autentica um usuário com email e senha
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Email do usuário
 *               senha:
 *                 type: string
 *                 description: Senha do usuário
 *     responses:
 *       200:
 *         description: Usuário autenticado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Token de autenticação JWT
 *       401:
 *         description: Credenciais inválidas
 */
router.post('/login/usuario', loginUsuario);

// Exporta o roteador para ser usado em outros módulos da aplicação
module.exports = router;
