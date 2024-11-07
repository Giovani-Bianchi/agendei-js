/**
 * ? Arquivo Base da Aplicação - Tem a responsabilidade de instanciar a aplicação e levantar ela
 * 
 * ? Conteúdos para aprofundar/dominar (banco de dados): CRUD (select, insert, update, delete) e transação dentro de BD, modelagem de dados, levantamento de requisitos
 * ? Conteúdos para aprofundar/dominar (back-end): TokenJWT e deploy da API para produção

 * ------------------------------------------------
 * * Ao chegar uma requisição para a API, ela irá ver a rota que o usuário está querendo acessar e de qual método HTTP ele está utilizando, para assim saber o que retornar para o usuário como response (resposta)
 * * Para testar uma API há vários Softwares que ajudam com isso, iremos utilizar o Postman
 * * É importante criar a API bem organizada pensando em possíveis manutenções futuras, se for apenas criando as rotas sem planejamento, no futuro pode  ser complicado manter a API
 * * Essa API irá servir tanto a aplicação mobile quanto a aplicação web
 * 
 * * Entendendo toda essa estrutura, é meio caminho andado para criar qualquer API
 * 
 * * Quando o assunto é sobre trabalhar com API acessando um Banco de Dados temos dois jeitos de fazer isso: utilizar uma ORM ou SQL Nativo com Querys Nativas, escritas manualmente
 * * Principais ORMs para trabalhar com essa Stack JS: TypeORM, Sequelize, Prisma, Mongoose
 * 
 * * É interessante trabalhar com o SQL Nativo ao invés de utilizar ORMs pois você tem controle sobre todos os comandos que serão executados no seu Banco de Dados
 * 
 * * É necessário, quando utilizando o JSON para passagem de dados, indicar para o Express que vamos trabalhar com os dados no formato JSON
 */

/**
 * ? Comandos Utilizados
 * ------------------------------------------------
 * * npm init - Para começar o projeto criando o package.json
 * * npm install express - Para instalar o express, responsável por criar o servidor
 * * npm install cors -  Para instalar o cors, responsável por permitir requisições de outros domínios
 * * node --watch src/index.js - Toda vez que editar e salvar um arquivo dentro do projeto, o Node automaticamente irá recompilar a aplicação, sem ter que ficar parando a aplicação e reiniciando
 * * npm install sqlite3 - Instala o sqlite3, responsável por criar o Banco de Dados
 * * npm install bcrypt - Instala o bcrypt, responsável por criptografar as senhas
 * * npm install jsonwebtoken - Instala o jsonwebtoken, responsável por criar tokens de autenticação
 */

/**
 * ? Controllers - Processa os dados que estão chegando da requisição. Ele "abre" a requisição e vê os dados que estão dentro dela, como estão chegando, fazer uma validação etc.
 * ------------------------------------------------
 * * No controller é recebido os dados da requisição (req) e é enviado os dados para o cliente por meio da resposta (res), é nele que recebemos os dados vindos do corpo da requisição com o req.body
 */

/**
 * ? Services - Um único arquivo que irá conter todos os métodos/funções de uma seção da aplicação, como doctors por exemplo: a service.doctor terá o método Listar, Inserir, Editar, Excluir etc.
 * ------------------------------------------------
 * * No service apenas é passado os dados para "frente", para o repository, não é responsável por executar a lógica SQL. Porém é na service que criamos Regras de Negócio (se necessário), como criptografia de senha validação de dados, etc.
 * * Ou usa a estrutura de Services ou usa a estrutura de Use Case, ambos são iguais, apenas muda a forma de estruturar
 */

/**
 * ? Use Case - Um arquivo separado para cada método/função, ou seja: cada método/função terá seu próprio arquivo, exemplo: ListarDoctors, InserirDoctors, EditarDoctors etc.
 * ------------------------------------------------
 * * Ou usa a estrutura de Services ou usa a estrutura de Use Case, ambos são iguais, apenas muda a forma de estruturar
 */

/**
 * ? Repository - Arquivo em que a conexão com o Banco de Dados é de fato feita. Há um repository para cada seção também, um para doctors, outro para users, mesma lógica do service
 * ------------------------------------------------
 * * No repository, com os dados que foram entregues pelo service, ele executa a função de acordo com os comandos SQL. No caso do método de 'Listar', ele não recebe dados, pois ele pega os dados do Banco de Dados nesse caso, apenas recebe dados caso possua um filtro
 */

// * Importações

// Importação do Express para rodar o servidor
import express from 'express';
// Importação do Cors para permitir requisições de outros domínios
import cors from 'cors';
// Importação do Arquivo de Rotas
import router from './routes.js';

// * Instanciar o servidor com express, que é quem vai levantar o servidor
const app = express();

// * Habilitando o Express para trabalhar com o formato JSON
app.use(express.json());

// * Rodando o cors
app.use(cors());

// * Utilizando as rotas
app.use(router);

// Ouvinte da porta 3001
app.listen(3001, () => {
    console.log("Servidor rodando na porta: 3001");
});