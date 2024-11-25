const express = require('express');
const sequelize = require('./config/database');
const userRoutes = require('./routes/userroutes'); // Importa as rotas de usuários
const generateDescriptionRoutes = require('./routes/generatedescription'); // Importa as rotas de geração de descrição
require('dotenv').config();

const app = express();

// Middleware para interpretar JSON no corpo das requisições
app.use(express.json());

// Registra as rotas
app.use('/users', userRoutes); // Rotas de usuários
app.use('/users/generate-description', generateDescriptionRoutes); // Rotas de geração de descrição

// Importa as funções de conexão e escuta do RabbitMQ
const { connectRabbitMQ, listenToQueue } = require('./rabbitmq');

// Função principal para iniciar o servidor e conectar ao RabbitMQ
(async () => {
    try {
        // Conecta ao RabbitMQ
        await connectRabbitMQ();
        console.log('RabbitMQ conectado no microsserviço de usuários!');

        // Configura o consumo de eventos do RabbitMQ
        listenToQueue('task_created', (task) => {
            console.log('Evento recebido do RabbitMQ: Nova tarefa criada');
            console.log('Dados da tarefa:', task);
        });

        // Sincroniza banco de dados
        await sequelize.sync();
        console.log('Banco de dados conectado e sincronizado!');

        // Inicia o servidor
        const PORT = process.env.PORT || 3001;
        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}`);
        });
    } catch (error) {
        console.error('Erro ao iniciar o servidor:', error);
    }
})();

// Rota de teste para validar o servidor
app.get('/test', (req, res) => {
    res.send('Rota de teste funcionando!');
});
