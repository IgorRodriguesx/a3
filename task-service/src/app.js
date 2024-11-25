const express = require('express');
const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
const Task = require('./models/task');
const taskRoutes = require('./routes/rota'); // Importa as rotas

// Carregar as variáveis do arquivo .env
dotenv.config();

const app = express();

app.use(express.json()); // Middleware para JSON

//// Importando e iniciando a conexão após a iniciação do servidor
const { connectRabbitMQ } = require('./rabbitmq');

connectRabbitMQ()
    .then(() => console.log('RabbitMQ conectado no microsserviço!'))
    .catch(console.error);

// Definir a URL de conexão com o banco de dados utilizando as variáveis de ambiente
const sequelize = new Sequelize({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  dialect: 'postgres',
  logging: false, // Desabilitar logs SQL
});

// Testa a conexão com o banco e cria as tabelas
sequelize.authenticate()
  .then(() => {
    console.log('Banco de dados conectado com sucesso!');
  })
  .catch((error) => {
    console.error('Erro ao conectar com o banco de dados:', error);
  });

// Sincronizar modelos com o banco de dados
sequelize.sync()
  .then(() => {
    console.log('Tabelas sincronizadas com sucesso!');
  })
  .catch((error) => {
    console.error('Erro ao sincronizar as tabelas:', error);
  });

// Registra a rota /task com as rotas definidas em taskRoutes
app.use('/task', taskRoutes);

// Inicia o servidor
app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
