// Importa o módulo Router do Express
const { Router } = require('express');

// Importa a função avaliacao do controlador 'avaliacaoController'
const { avaliacao } = require('../controller/avaliacaoController');

// Cria uma nova instância do roteador do Express
const router = Router();

/**
 * @swagger
 * /store/avaliacao:
 *   post:
 *     summary: Armazena uma nova avaliação
 *     description: Cadastra uma nova avaliação no sistema
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               usuario_id:
 *                 type: string
 *                 description: ID do usuário que está fazendo a avaliação
 *               avaliacao:
 *                 type: number
 *                 description: Nota da avaliação
 *     responses:
 *       201:
 *         description: Avaliação armazenada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.post('/store/avaliacao', avaliacao);

// Exporta o roteador para ser usado em outros módulos da aplicação
module.exports = router;
