/*
    * Arquivo de Funções do Componente de Register
    ----------------------------------------------------------------------------------------------------------
*/

// Importação da API
import api from '../../constants/api.js';

// Função Assíncrona para Executar o Registro
export const executeAccount = async (name, email, password, password2, setMsg, navigate) => {

    // Zerando a mensagem de erro, assim quando o usuário clicar novamente no botão de Registro, já que a variável de mensagem foi zerada, o Alert irá sumir
    setMsg("");

    // Se as senhas forem diferentes uma da outra, entre a senha e a confirmação, exibe uma mensagem de erro e nem tenta executar a requisição
    if (password != password2) {
        return setMsg("As senhas não conferem. Digite novamente.");
    }

    // Tenta executar a requisição para a API
    try {

        // Criando a requisição de Register para a API usando o método POST
        const response = await api.post("/admin/register", {
            name,
            email,
            password
        });

        // Se no response existir o objeto 'data', significa que o registro foi bem sucedido, redirecionamos o usuário para realizar o Login
        if (response.data) {
            // Irá redirecionar o usuário para a tela de Login
            navigate("/login")
        }

        // Caso contrário, se não existir o objeto 'data', significa que o registro falhou, então é passado uma mensagem genérica de erro
        else {
            // Passando a mensagem padrão para o setMsg
            setMsg("Erro ao criar conta. Tente novamente mais tarde.");
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
            setMsg("Erro ao criar conta. Tente novamente mais tarde.");
        }

    }

}