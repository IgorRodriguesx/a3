const amqp = require('amqplib');

async function connect() {
  try {
    const connection = await amqp.connect('amqp://localhost');
    console.log('Conectado ao RabbitMQ!');
    connection.close();
  } catch (error) {
    console.error('Erro ao conectar ao RabbitMQ:', error);
  }
}

connect();
