/* 
    * Main JSX - Responsável por criar renderizar os elementos dentro da div root, é a porta de entrada, a aplicação como um todo
    ----------------------------------------------------------------------------------------------------------
*/

// Importando o CSS Global
import "./styles/global.css";

// Importando o react
import React from 'react'

// Importando o createRoot do react
import { createRoot } from 'react-dom/client'

// Importando os componentes
import Rotas from "./rotas.jsx";

// Aqui está sendo criado a raiz da aplicação. Captura a div com id root e renderiza esse código dentro dela
createRoot(document.getElementById('root')).render(

    // Renderizando o componente Rotas
    <Rotas />

)