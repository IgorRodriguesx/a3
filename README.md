## Projeto Backend com Arquitetura de Microsserviços

Este projeto implementa uma arquitetura de **microsserviços** com dois serviços principais: o **Task Service** e o **User Service**. A comunicação entre os serviços é feita de forma assíncrona utilizando o **RabbitMQ**. 

## 📂 Estrutura do Projeto

```plaintext
ProjetoBackend/
├── task-service/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── events/
│   │   ├── models/
│   │   │   └── task.js
│   │   ├── Requests/
│   │   │   ├── testeATUALIZACAO.http
│   │   │   ├── testeCRIACAO.http
│   │   │   ├── testeDELETE.http
│   │   │   ├── testeGET.http
│   │   ├── routes/
│   │   │   └── rota.js
│   │   ├── services/
│   │   ├── .env
│   │   ├── app.js
│   │   ├── rabbitmq.js
├── user-service/
│   ├── config/
│   │   └── database.js
│   ├── models/
│   │   └── user.js
│   ├── node_modules/
│   ├── Requests/
│   │   ├── testeDELETE.http
│   │   ├── testeGET.http
│   │   ├── testePATCH.http
│   │   ├── testePOST.http
│   │   ├── testesGeracaoDescricao.http
│   ├── routes/
│   │   ├── generateDescription.js
│   │   └── userRoutes.js
│   ├── services/
│   │   └── chatGptService.js
│   ├── .env
│   ├── app.js
│   ├── Controllers/
│   ├── package.json
│   ├── package-lock.json
│   ├── rabbitmq.js
│   ├── test-rabbitmq.js
├── LICENCE
├── package.json
├── package-lock.json
├── .gitattributes


📝 Descrição dos Serviços

1. Task Service
Descrição: Serviço responsável por gerenciar tarefas. Implementa um CRUD básico para criação, leitura, atualização e exclusão de tarefas.
Arquivos principais:
task.js: Define o modelo das tarefas.
rota.js: Contém as rotas de API relacionadas às tarefas.
rabbitmq.js: Configuração para integração com o RabbitMQ.
app.js: Configuração do servidor e middleware.

2. User Service
Descrição: Serviço para gerenciar usuários e gerar descrições personalizadas utilizando a API do ChatGPT.
Arquivos principais:
user.js: Define o modelo dos usuários.
userRoutes.js: Define as rotas relacionadas aos usuários.
chatGptService.js: Integração com a API do ChatGPT para geração de descrições.
rabbitmq.js: Configuração para integração com o RabbitMQ.

🛠️ Configuração do Ambiente

Requisitos
Certifique-se de ter os seguintes softwares instalados:

Node.js (v18+)
RabbitMQ
Banco de dados relacional (PostgreSQL ou MySQL)
Configuração dos Arquivos .env
Task Service
Local: task-service/src/.env
env

RABBITMQ_URL=amqp://localhost
User Service
Local: user-service/.env
env

OPENAI_API_KEY=<sua-chave-da-api>
RABBITMQ_URL=amqp://localhost
DB_HOST=<endereço-do-banco>
DB_USER=<usuario>
DB_PASSWORD=<senha>
DB_NAME=<nome-do-banco>
DB_PORT=<porta>


🚀 Como Executar

1. Instalar Dependências
Em cada serviço (task-service e user-service), execute:

npm install

2. Subir o RabbitMQ
Caso utilize Docker, rode o seguinte comando:


docker run -d --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3-management
3. Inicializar os Serviços
Inicie cada serviço em terminais separados:


# Task Service
cd task-service/src
node app.js

# User Service
cd user-service
node app.js

🔄 Fluxo de Comunicação entre Serviços
O User Service gerencia usuários e gera descrições personalizadas, publicando mensagens no RabbitMQ.
O Task Service pode consumir essas mensagens para realizar ações específicas com base nos eventos publicados.

📊 Banco de Dados
O banco de dados é configurado no arquivo user-service/config/database.js.
Certifique-se de ajustar as credenciais de acesso no arquivo .env.

🔧 Testando os Endpoints
Os arquivos da pasta Requests/ permitem testar os endpoints utilizando a extensão REST Client do VS Code.

Task Service

testeCRIACAO.http: Testa a criação de tarefas.
testeGET.http: Testa a recuperação de tarefas.
User Service

testePOST.http: Testa a criação de usuários.
testesGeracaoDescricao.http: Testa a geração de descrições personalizadas.

🛡️ Licença
Este projeto está licenciado sob os termos da licença MIT. Consulte o arquivo LICENCE para mais detalhes.
