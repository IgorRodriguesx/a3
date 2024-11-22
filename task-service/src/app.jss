const express = require('express');
const sequelize = require('./config/database');
const Task = require('./models/task');
const taskRoutes = require('./routes/rota'); // Importa as rotas

const app = express();

app.use(express.json()); // Middleware para JSON

// Registra a rota /task com as rotas definidas em taskRoutes
app.use('/task', taskRoutes);

// Testa a conexão com o banco e cria as tabelas
sequelize.sync()
  .then(() => {
    console.log('Banco de dados conectado e tabelas sincronizadas!');
  })
  .catch((error) => {
    console.error('Erro ao conectar com o banco de dados:', error);
  });

// Inicia o servidor
app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
