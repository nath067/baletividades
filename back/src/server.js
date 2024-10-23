const express = require('express');
const cors = require('cors');
require('dotenv').config();
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

// Swagger configuration
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "API de Tarefas",
      version: "1.0.0",
      description: "API CRUD para gerenciar tarefas",
    },
    servers: [{ url: "http://localhost:3001" }],
  },
  apis: [`${__dirname}/routes/*.js`], // Path to the route files
};

// Initialize Swagger Docs
const swaggerDocs = swaggerJsDoc(swaggerOptions);

const app = require('./app');
const port = process.env.PORT || 3003; // Default port if not set in environment variables

// Middleware setup
app.use(express.json());
app.use(cors());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs)); // Swagger docs route

// Start the server
app.listen(port, () => console.log(`Rodando na porta ${port}`));
