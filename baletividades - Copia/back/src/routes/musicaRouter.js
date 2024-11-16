const { Router } = require('express');
const { postarMusica, getMusicas } = require('../controller/musicaController');
const router = Router();

router.post('/postar/musica', postarMusica);
router.get('/get/musica', getMusicas);

module.exports = router;
