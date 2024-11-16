// Importa o módulo Router do Express
const { Router } = require('express');

// Importa as funções do controlador 'atividadeController'
const { getAtividades, postarAtividade, salvarAtividade, atividadesSalvas, getAtividadeById } = require('../controller/atividadeController');

// Cria uma nova instância do roteador do Express
const router = Router();

/**
 * @swagger
 * /postar/atividade:
 *   post:
 *     summary: Cadastra uma nova atividade
 *     responses:
 *       201:
 *         description: Sucesso ao cadastrar atividade
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.post('/postar/atividade', postarAtividade);

/**
 * @swagger
 * /get/atividade:
 *   get:
 *     summary: Retorna todas as atividades
 *     responses:
 *       200:
 *         description: Lista de atividades
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get('/get/atividade/:tipo_atividade', getAtividades);

/**
 * @swagger
 * /salvar/atividade:
 *   post:
 *     summary: Salva uma atividade
 *     responses:
 *       201:
 *         description: Sucesso ao salvar atividade
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.post('/salvar/atividade', salvarAtividade);

/**
 * @swagger
 * /atividade/salva/{usuario_id}:
 *   get:
 *     summary: Retorna atividades salvas por um usuário específico
 *     parameters:
 *       - in: path
 *         name: usuario_id
 *         required: true
 *         description: ID do usuário
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de atividades salvas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get('/atividade/salva/:usuario_id', atividadesSalvas);

router.get('/descricao/atividade/:id', getAtividadeById);

// Exporta o roteador para ser usado em outros módulos da aplicação
module.exports = router;
