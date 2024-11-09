/**
 * * Arquivo Base da Aplicação - Tem a responsabilidade de instanciar a aplicação e levantar ela
 * ------------------------------------------------
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