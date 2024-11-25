const amqp = require('amqplib');

let connection;
let channel;

// Conecta ao RabbitMQ e cria um canal
async function connectRabbitMQ() {
    try {
        connection = await amqp.connect('amqp://localhost'); // Altere a URL se necessário
        channel = await connection.createChannel();
        console.log('Conectado ao RabbitMQ');
    } catch (error) {
        console.error('Erro ao conectar no RabbitMQ:', error);
    }
}

// Obtém o canal para uso
function getChannel() {
    if (!channel) {
        throw new Error('Canal do RabbitMQ ainda não foi inicializado');
    }
    return channel;
}

// Ouve uma fila específica
async function listenToQueue(queue, callback) {
    if (!channel) {
        throw new Error('Canal do RabbitMQ ainda não foi inicializado');
    }
    await channel.assertQueue(queue); // Cria a fila, se não existir
    channel.consume(queue, (message) => {
        if (message !== null) {
            callback(JSON.parse(message.content.toString())); // Processa o evento
            channel.ack(message); // Confirma a mensagem
        }
    });
}

module.exports = {
    connectRabbitMQ,
    getChannel,
    listenToQueue,
};
