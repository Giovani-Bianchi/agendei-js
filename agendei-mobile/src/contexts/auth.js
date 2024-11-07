/**
 * ? Contexto Auth
 * ------------------------------------------------
 * * Irá controlar o contexto relacionado à autenticação
 * 
 * * É necessário criar um provedor de dados para esse contexto, que seria um lugar onde ficaria disponível apenas o que eu quero que fique aberto para qualquer parte da aplicação acessar, o que não estiver ali dentro, não estará acessível para toda a aplicação.
*/

// Importações do react
import { createContext, useState } from "react";

// Instanciando o AuthContext com o método createContext com um objeto vazio dentro
const AuthContext = createContext({});

// Criação do provedor de dados do AuthContext
function AuthProvider(props) {

    // Criando uma variável de estado para o user, com um objeto vazio por padrão. A ideia é dentro dessa variável user inserir o objeto contendo as informações do usuário do corpo da requisição
    const [user, setUser] = useState({});

    // Retorna o provedor do nosso contexto, todo mundo que importar o AuthContext, vai poder acessar o user e o setUser
    return <AuthContext.Provider value={{user, setUser}}>
            {/* É necessário aqui devolver toda a aplicação, para que o contexto seja acessível em toda a aplicação. Para isso passamos o children do AuthProvider, ou seja, o elemento que está entre a tag do AuthProvider na tela do App.js, que seria os routes, que contém toda a aplicação */}
            {props.children}
    </AuthContext.Provider>

}

// Exportando o provedor e o contexto
export { AuthProvider, AuthContext };