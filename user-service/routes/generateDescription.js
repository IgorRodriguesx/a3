const express = require('express');
const { generateUserDescription } = require('../services/chatGptService');

const router = express.Router();

// Rota para gerar a descrição do usuário
router.post('/', async (req, res) => {
  console.log('Requisição recebida na rota /users/generate-description');
  const { name, age, interests } = req.body;

  if (!name || !age || !interests) {
    return res.status(400).json({ error: 'Nome, idade e interesses são necessários.' });
  }

  try {
    // Chama o serviço para gerar a descrição
    const description = await generateUserDescription({ name, age, interests });
    res.status(200).json({ description });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
