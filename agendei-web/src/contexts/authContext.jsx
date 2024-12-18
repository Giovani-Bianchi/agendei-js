/* 
    * AuthContext - Contexto API de Autenticação
    ----------------------------------------------------------------------------------------------------------
*/

// Importação da API
import api from "../constants/api";

// Importações para criação do AuthContext
import { createContext, useContext, useEffect, useState } from "react";

// Criando o contexto AuthContext
export const AuthContext = createContext();

// Criando o provider do AuthProvider
export const AuthProvider = ({children}) => {

    // Constante para armazenar o estado do token vindo do localStorage
    const [token, setToken] = useState(() => {
        return localStorage.getItem('sessionToken') || null;
    });

    // Constante para armazenar o estado do nome vindo do localStorage
    const [name, setName] = useState(() => {
        return localStorage.getItem('sessionName') || null;
    });

    // Constante para armazenar o estado do id vindo do localStorage
    const [id, setId] = useState(() => {
        return localStorage.getItem('sessionId') || null;
    });

    // Constante para armazenar o estado do email vindo do localStorage
    const [email, setEmail] = useState(() => {
        return localStorage.getItem('sessionEmail') || null;
    });

    // Constante para armazenar o estado de carregamento
    const [loading, setLoading] = useState(true);

    // Faz a verificação inicial do token
    useEffect(() => {

        // Constante que verifica se o token existe no LocalStorage
        const verifyToken = async () => {

            // Armazena o token na variável storedToken se conseguir pegar o token do localStorage
            const storedToken = localStorage.getItem('sessionToken');

            // Se o token exisitr, armazena o seu valor na variável token por meio do state setToken
            if (storedToken) {
                setToken(storedToken);
            }

            // Armazena false no loading por meio do state setLoading para indicar que o carregamento foi concluído
            setLoading(false);

        };

        // Executa a função verifyToken sempre que o componente for renderizado
        verifyToken();

    }, []);

    // Atualiza o LocalStorage sempre que o token, name, id ou email mudar
    useEffect(() => {

        // Se existir o Token, armazena ele no LocalStorage e no header Authorization da API. Senão existir, remove do localStorage e do header Authorization da API

        if (token) {
            localStorage.setItem('sessionToken', token);
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } 
        
        else {
            localStorage.removeItem('sessionToken');
            delete api.defaults.headers.common['Authorization'];
        }

        // Se existir o Name, armazena ele no LocalStorage. Senão existir, remove do localStorage

        if (name) {
            localStorage.setItem('sessionName', name);
        } 
        
        else {
            localStorage.removeItem('sessionName');
        }

        // Se existir o Id, armazena ele no LocalStorage. Senão existir, remove do localStorage

        if (id) {
            localStorage.setItem('sessionId', id);
        } 
        
        else {
            localStorage.removeItem('sessionId');
        }

        // Se existir o Email, armazena ele no LocalStorage. Senão existir, remove do localStorage

        if (email) {
            localStorage.setItem('sessionEmail', email);
        } 
        
        else {
            localStorage.removeItem('sessionEmail');
        }

    }, [token, name, id, email]);

    // Função para login
    const login = (newToken, newName, newId, newEmail) => {
        setToken(newToken);
        setName(newName);
        setId(newId);
        setEmail(newEmail);
    };

    // Função para logout
    const logout = () => {
        // Armzena nulo nas variáveis de estado, o que faz com que caia no else e apague esses dados do LocalStorage
        setToken(null);
        setName(null);
        setId(null);
        setEmail(null);

        // Remove o cabeçalho contendo o Token
        api.defaults.headers.common['Authorization'] = null;
    };

    // Retornando um JSX com o contexto AuthContext e a children, o que significa que o AuthContext irá englobar outro elemento dentro dele
    return (
        <AuthContext.Provider value={{token, name, id, email, login, logout, loading}}>
            {children}
        </AuthContext.Provider>
    )

}

// Hook personalizado para usar o AuthContext
export function useAuth() {
    return useContext(AuthContext);
}