<div align="center">
  <img src="https://github.com/user-attachments/assets/f6f322c7-7587-46b2-9e97-760b7da8ebac" height="75"/>
</div>

# Agendei JS - Sistema de consultas médicas
Esse repositório irá conter os arquivos fontes referentes ao projeto Agendei JS da <a href="https://www.youtube.com/@devpoint.oficial">DevPoint</a>. Esse repositório foi criado após o término do curso, porém muitas funcionalidades e melhorias estavam faltando (principalmente no projeto web), daí surgiu a ideia de continuar e aprimorar a aplicação.

## 📌 Sobre
A ideia do projeto foi criar um sistema de agendas de consultas médicas com interface Web para o administrador e interface Mobile para o usuário, com uma API para o controle de requisições. O projeto engloba diferentes conceitos com as linguagens indicadas abaixo, como: criação de uma API REST com Node, navegação entre telas com React Native, utilização de token para validação de requisições, variáveis de estado, Context API, layout moderno com Bootstrap, entre diversos outros.

## ⚙ Tecnologias
<div>
  <h3>Front-End</h3>
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" /> &nbsp
  <img src="https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" /> &nbsp
  <img src="https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white" /> &nbsp
  <img src="https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white" /> &nbsp
  <img src="https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E" /> &nbsp
</div>

<div>
  <h3>Back-End</h3>
  <img src="https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" /> &nbsp
  <img src="https://img.shields.io/badge/Express%20js-000000?style=for-the-badge&logo=express&logoColor=white" /> &nbsp
  <img src="https://img.shields.io/badge/Expo-1B1F23?style=for-the-badge&logo=expo&logoColor=white" /> &nbsp
</div>

## 🚀 Instalando o Agendei JS

<h3>Pré-requisitos</h3>

Antes de começar, verifique se você atendeu aos seguintes requisitos:

- Node.js
- SQLite 3
- Expo no celular para o projeto Mobile

<h3>Começando</h3>

Clone o projeto com o seguinte comando:

```
git clone https://github.com/Giovani-Bianchi/agendei-js.git
```

Instale as dependências com npm em cada projeto (api, mobile e web):

```
npm install
```

No projeto da API em database, rode o script de Banco de Dados `script-database.txt` e nomeie como 'banco.db' (ou altere o nome do banco para o que desejar e altere no arquivo de conexão em `sqlite.js`). No arquivo `index.js` altere a porta ouvinte da API se precisar.

Rode a API com o seguinte comando:

```
node --watch src/index.js
```

Em seguida, basta rodar o projeto:

- Mobile (altere a baseURL do arquivo `api.js` para o seu endereço IPv4 + porta escolhida ao iniciar o projeto Mobile)
```
npx expo start
```

- Web (altere a porta ouvinte da API para a porta escolhida na baseURL do arquivo `api.js`)
```
npm run dev
```

## 💻 Layout do projeto

<h3>Layout na aplicação web (clique na imagem para ter uma melhor visualização)</h3>

<div align="center">
  <img src="https://github.com/user-attachments/assets/7550e0a9-5a42-4ba1-9b89-d6827a983b5d" height="200" width="400" />
  <img src="https://github.com/user-attachments/assets/81cad838-12f9-4bd7-b898-e5c679e2c2ee" height="200" width="400" />
  <img src="https://github.com/user-attachments/assets/465bb657-9d6a-4115-938c-50a3c5ba35e9" height="200" width="400" />
  <img src="https://github.com/user-attachments/assets/83c60338-6d90-4d23-9899-fb1602d1cd06" height="200" width="400" />
  <img src="https://github.com/user-attachments/assets/2e1b68c0-ba73-4c8e-878a-c24cf502ffec" height="200" width="400" />
  <img src="https://github.com/user-attachments/assets/9c193af5-250f-49fc-8738-8e655edd1738" height="200" width="400" />
  <img src="https://github.com/user-attachments/assets/a8a7ceed-9fa6-4028-8c19-9b78308b0ca1" height="200" width="400" />
  <img src="https://github.com/user-attachments/assets/b5674e4c-1eba-4180-b276-61a0dac77945" height="200" width="400" />
</div>

<h3>Layout na aplicação mobile (clique na imagem para ter uma melhor visualização)</h3>

<div align="center">
  <img src="https://github.com/user-attachments/assets/1dd77a09-3b97-46f7-b24e-3798cf45b3b8" height="300" width="150" />
  <img src="https://github.com/user-attachments/assets/5cb6933a-f7e2-4242-93b6-d26aa31e31e0" height="300" width="150" />
  <img src="https://github.com/user-attachments/assets/de641aeb-4f54-4b57-9d22-c36908d87139" height="300" width="150" />
  <img src="https://github.com/user-attachments/assets/2d02a3d8-7e94-4681-8eac-71f77b43d0b9" height="300" width="150" />
  <img src="https://github.com/user-attachments/assets/96b97c9e-9a56-4204-aa4b-9f165c2eafbe" height="300" width="150" />
  <img src="https://github.com/user-attachments/assets/14c19c00-5f23-4036-a5a2-968035f4a368" height="300" width="150" />
  <img src="https://github.com/user-attachments/assets/51c882c6-f5bb-45d8-bd5c-a030dc1dd44f" height="300" width="150" />
</div>

## 🧔 Autor
<a href="https://github.com/Giovani-Bianchi">Giovani Wesselka Heriberto Bianchi</a>

<a href="https://www.linkedin.com/in/giovaniwhb/" target="_blank"><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" /></a>
<a href="mailto:giovaniwhb@gmail.com"><img src="https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white" /></a>
