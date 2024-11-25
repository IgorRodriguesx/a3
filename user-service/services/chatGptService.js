const axios = require('axios');

// Função para gerar descrição do usuário utilizando a API do ChatGPT
const generateUserDescription = async (userInfo) => {
  const apiKey = process.env.OPENAI_API_KEY;  // Sua chave da API do OpenAI
  const endpoint = 'https://api.openai.com/v1/chat/completions';

  // Logando as informações do usuário que estão sendo enviadas para a API
  console.log('Gerando descrição para o usuário com as seguintes informações:');
  console.log(`Nome: ${userInfo.name}, Idade: ${userInfo.age}, Interesses: ${userInfo.interests}`);

  const messages = [
    {
      role: 'system',
      content: 'Você é um assistente que gera descrições personalizadas com base em informações fornecidas.',
    },
    {
      role: 'user',
      content: `Crie uma descrição personalizada para um usuário com as seguintes informações: Nome: ${userInfo.name}, Idade: ${userInfo.age}, Interesses: ${userInfo.interests}.`,
    },
  ];

  try {
    // Logando o envio da requisição
    console.log('Enviando requisição para a API do OpenAI...');
    const response = await axios.post(
      endpoint,
      {
        model: 'gpt-3.5-turbo', // Modelo da OpenAI
        messages: messages,
        max_tokens: 150, // Limite de tokens (ajuste conforme necessário)
      },
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      }
    );

    // Logando a resposta recebida da API
    console.log('Resposta recebida da API do OpenAI:');
    console.log(response.data);

    // Retorna a descrição gerada
    const description = response.data.choices[0].message.content;
    console.log('Descrição gerada:', description);

    return description;
  } catch (error) {
    // Logando o erro se ocorrer
    console.error('Erro ao gerar descrição:', error);
    throw new Error('Erro ao gerar descrição do usuário.');
  }
};

module.exports = { generateUserDescription };
