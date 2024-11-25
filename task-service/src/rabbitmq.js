const amqp = require('amqplib');

let connection;
let channel;

const connectRabbitMQ = async () => {
    try {
        connection = await amqp.connect('amqp://localhost');
        channel = await connection.createChannel();
        console.log('Conectado ao RabbitMQ!');
    } catch (error) {
        console.error('Erro ao conectar no RabbitMQ:', error);
    }
};

const getChannel = () => channel;

module.exports = { connectRabbitMQ, getChannel };
