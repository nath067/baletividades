const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');
const fileUpload = require('express-fileupload');

const cors = require('cors');
const atividadeRouter = require('./routes/atividadeRouter');
const usuarioRouter = require('./routes/cadastroRouter');
const avaliacaoRouter = require('./routes/avaliacaoRouter');
const musicaRouter = require('./routes/musicaRouter');

const app = express();

app.set('port', process.env.PORT || 3005);
app.use(cors());
app.use(express.json());
app.use(fileUpload())

app.use('/uploads', express.static(path.join(__dirname, "uploads")))
// Define a pasta de uploads como uma rota estática
app.use('/uploads/musicas', express.static(path.join(__dirname, 'uploads', 'musicas')));

app.use('/api', atividadeRouter);
app.use('/api', usuarioRouter);
app.use('/api', avaliacaoRouter);
app.use('/api', musicaRouter);

module.exports = app;