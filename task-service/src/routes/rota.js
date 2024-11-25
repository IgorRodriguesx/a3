const express = require('express');
const router = express.Router();
const Task = require('../models/task');
const { getChannel } = require('../rabbitmq'); // Importa a conexão com o RabbitMQ

// Middleware para logar as chamadas para a rota /task
router.use((req, res, next) => {
    console.log(`Rota ${req.method} ${req.originalUrl} foi chamada`);
    next(); // Passa o controle para a próxima rota
});

// Rota POST para criar uma nova tarefa
router.post('/', async (req, res) => {
    const { name, date, category } = req.body;

    if (!name || !date || !category) {
        return res.status(400).json({ error: 'Os campos name, date e category são obrigatórios' });
    }

    try {
        const task = await Task.create({ name, date, category });

        // Publicar evento no RabbitMQ
        const channel = getChannel();
        channel.sendToQueue('task_created', Buffer.from(JSON.stringify(task)));

        res.status(201).json(task);
    } catch (error) {
        console.error('Erro ao criar tarefa:', error);
        res.status(500).json({ error: error.message });
    }
});

// Rota GET para obter todas as tarefas
router.get('/', async (req, res) => {
    try {
        const tasks = await Task.findAll();
        res.status(200).json(tasks);
    } catch (error) {
        console.error('Erro ao obter tarefas:', error);
        res.status(500).json({ error: error.message });
    }
});

// Rota PATCH para atualizar uma tarefa existente
router.patch('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, date, category, completed } = req.body;

    try {
        const task = await Task.findByPk(id);
        if (!task) {
            return res.status(404).json({ error: 'Tarefa não encontrada' });
        }

        task.name = name || task.name;
        task.date = date || task.date;
        task.category = category || task.category;
        task.completed = completed !== undefined ? completed : task.completed;

        await task.save();
        res.status(200).json(task);
    } catch (error) {
        console.error('Erro ao atualizar tarefa:', error);
        res.status(500).json({ error: error.message });
    }
});

// Rota DELETE para remover uma tarefa
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const task = await Task.findByPk(id);
        if (!task) {
            return res.status(404).json({ error: 'Tarefa não encontrada' });
        }

        await task.destroy();
        res.status(204).send(); // Retorna 204 No Content
    } catch (error) {
        console.error('Erro ao deletar tarefa:', error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
