const express = require('express');
const router = express.Router();
const Task = require('../models/task'); 

// Middleware para logar as chamadas para a rota /task
router.use((req, res, next) => {
  console.log("Rota /task foi chamada");
  next(); // Passa o controle para a próxima rota
});

// Rota POST para criar uma nova tarefa
router.post('/', async (req, res) => {
  const { name, date, category } = req.body;
  try {
    const task = await Task.create({
      name,
      date,
      category,
    });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Rota GET para obter todas as tarefas
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.findAll();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Rota Patch para atualizar uma tarefa existente
router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, date, category, completed } = req.body;
  
  console.log(`Atualizando a tarefa com ID: ${id}`);

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
    console.error("Erro ao atualizar tarefa:", error);
    res.status(500).json({ error: error.message });
  }
});

// Rota Delete para remover uma tarefa
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
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;
