/*
    * Arquivo de Funções do Componente de Service Add
    ----------------------------------------------------------------------------------------------------------
*/

// Importação da API
import api from "../../constants/api.js";

/* --------------------------------------------------------------------------------------------------------
 * Função para salvar/editar o serviço
---------------------------------------------------------------------------------------------------------- */

export const saveService = async (id_service, service, navigate) => {
        
    // Objeto json para armazenar os dados do serviço para o salvamento, nomeando a qual campo cada variável pertence quando fizer o POST. Estamos puxando os valores das nossas variáveis de estado conforme o que o usuário escolheu
    const json = {
        description: service,
    }

    // Tentar salvar o serviço com a requisição para a API
    try {
            
        // Criando a requisição de novo/editar serviço para a API, o segundo parâmetro é o que vai no corpo da requisição, passamos o objeto json contendo os valores para ele. Se o id_service for maior que 0 (ou seja, se ele existe), então é um serviço existente e vamos editar, caso contrário, é um novo serviço
        const response = id_service > 0 ? 
        await api.put("/services/" + id_service, json) : 
        await api.post("/services", json);

        // Se conseguiu inserir o serviço, redireciona o usuário para a lista
        if (response.data) {
            if (id_service > 0) {
                navigate("/services", { 
                    state: { message: "Serviço editado com sucesso!" } 
                });
            }

            else {
                navigate("/services", { 
                    state: { message: "Serviço salvo com sucesso!" } 
                });
            }
        }

    }
        
    // Se não conseguir, trata o erro que ocorreu, aqui é para erros que vieram do servidor (API)
    catch (error) {

        // Se dentro do error, conseguiu obter o response e dentro do response existe a propriedade data e dentro da data há qual é o erro (? significa que pode não existir)
        if (error.response?.data.error) {
            // Se o usuário não for autorizado a acessar essa tela, redireciona para a tela de login
            if (error.response.status == 401) {
                return navigate('/');
            }

            alert(error.response?.data.error);
        }

        // Se não conseguiu obter qual é o erro vindo do servidor, então exibe a mensagem de erro padrão
        else {
            alert("Erro ao salvar dados. Tente novamente mais tarde.");
        }

    }

}

/* --------------------------------------------------------------------------------------------------------
 * Função para carregar os dados do serviço com base no id_service
---------------------------------------------------------------------------------------------------------- */

export const loadService = async (id_service, setService, navigate) => {

    // Tentar executar a requisição GET
    try {
            
        // Criando a requisição de capturar os dados do serviço pelo ID para a API usando o método GET
        const response = await api.get("/admin/services/" + id_service);

        // Se obteve os dados de retorno da API, irá popular cada uma das variáveis de estado com os dados retornados da API, para preparar para a alteração futuramente
        if (response.data) {
            setService(response.data.description);
        }

    }
        
    // Se não conseguir, trata o erro que ocorreu, aqui é para erros que vieram do servidor (API)
    catch (error) {

        // Se dentro do error, conseguiu obter o response e dentro do response existe a propriedade data e dentro da data há qual é o erro (? significa que pode não existir)
        if (error.response?.data.error) {
            // Se o usuário não for autorizado a acessar essa tela, redireciona para a tela de login
            if (error.response.status == 401) {
                return navigate('/');
            }

            alert(error.response?.data.error);
        }

        // Se não conseguiu obter qual é o erro vindo do servidor, então exibe a mensagem de erro padrão
        else {
            alert("Erro ao listar serviço. Tente novamente mais tarde.");
        }

    }

}