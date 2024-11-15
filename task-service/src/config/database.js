const { Sequelize } = require('sequelize');
require('dotenv').config();

// Conexão com o banco de dados PostgreSQL
const sequelize = new Sequelize({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: 'postgres',
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

module.exports = sequelize;
