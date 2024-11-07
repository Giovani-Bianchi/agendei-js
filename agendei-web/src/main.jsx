/* 
    ? Main JSX - Responsável por criar renderizar os elementos dentro da div root, é a porta de entrada, a aplicação como um todo
    ----------------------------------------------------------------------------------------------------------
    * o createRoot é quem define qual vai ser o elemento utilizado para servir como a raiz pro projeto, em que irá conter a aplicação dentro, está puxando esse elemento pelo id root
    * Toda tag tem abertura e fechamento, exceto as tags de self-closing, que é aquela que não tem fechamento, como a tag img, ou a tag br, ou a tag hr, etc
    
    * Todo código Java Script dentro da aplicação tem que ser feita entre chaves
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