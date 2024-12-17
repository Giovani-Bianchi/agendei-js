/*
    * Arquivo de Funções do Componente de Login
    ----------------------------------------------------------------------------------------------------------
*/

// Importação da API com o Axios
import api from "../../constants/api.js";

/* --------------------------------------------------------------------------------------------------------
 * Função Assíncrona para Executar o Login
---------------------------------------------------------------------------------------------------------- */

export const executeLogin = async (email, password, setMsg, navigate, login) => {

    // Zerando a mensagem de erro, assim quando o usuário clicar novamente no botão de Login, já que a variável de mensagem foi zerada, o Alert irá sumir
    setMsg("");

    // Tenta executar a requisição para a API
    try {

        // Criando a requisição de Login para a API usando o método POST
        const response = await api.post("/admin/login", {
            email,
            password
        });

        // Se no response existir o objeto 'data', significa que o login foi bem sucedido, então guardamos os dados no LocalStorage e redirecionamos o usuário
        if (response.data) {
            // Usando o método login do useAuth para armazenar as informações de Login no AuthContext
            login(response.data.token, response.data.name, response.data.id_admin, response.data.email);

            // Irá redirecionar o usuário para a tela de Agendamentos
            navigate("/", { 
                state: { message: "Login executado com sucesso!" } 
            });
        }

        // Caso contrário, se não existir o objeto 'data', significa que o login falhou, então é passado uma mensagem genérica de erro
        else {
            // Passando a mensagem padrão para o setMsg
            setMsg("Erro ao efetuar login. Tente novamente mais tarde.");
        }

    }
    
    // Se não conseguir, trata o erro que ocorreu, aqui é para erros que vieram do servidor (API)
    catch (error) {

        // Se dentro do error, conseguiu obter o response e dentro do response existe a propriedade data e dentro da data há qual é o erro (? significa que pode não existir)
        if (error.response?.data.error) {
            // Inserindo a mensagem de erro na função de setMsg para ela jogar na variável msg, que é usada para exibir a mensagem de erro no Alert
            setMsg(error.response?.data.error);
        }

        // Se não conseguiu obter qual é o erro vindo do servidor, então exibe a mensagem de erro padrão
        else {
            // Passando a mensagem padrão para o setMsg
            setMsg("Erro ao efetuar login. Tente novamente mais tarde.");
        }

    }

}

/* --------------------------------------------------------------------------------------------------------
 * Função para capturar o aperto do enter e acionar o botão de login
---------------------------------------------------------------------------------------------------------- */

export const enterPress = (e, executeLogin) => {

    // Se o enter for pressionado, executa a função de ExecuteLogin
    if (e.key === 'Enter') {
        executeLogin();
    }

}