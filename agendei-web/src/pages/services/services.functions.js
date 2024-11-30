/*
    * Arquivo de Funções do Componente de Services
    ----------------------------------------------------------------------------------------------------------
*/

// Importando a API com o Axios
import api from "../../constants/api.js";

/* --------------------------------------------------------------------------------------------------------
 * Função de clickEdit - Passamos o id_service para identificar qual serviço está querendo editar, isso está vinculado ao clique do botão de Editar
---------------------------------------------------------------------------------------------------------- */

export const clickEdit = (id_service, navigate) => {

    // Levando o usuário para a tela de edição passando o ID do service
    navigate("/services/edit/" + id_service)

}

/* --------------------------------------------------------------------------------------------------------
 * Função de loadServices
---------------------------------------------------------------------------------------------------------- */

export const loadServices = async (setServices, navigate) => {

    // Tentar executar a requisição GET
    try {
            
        // Criando a requisição de services para a API usando o método GET
        const response = await api.get("/services");

        // Se obteve os dados de retorno da API
        if (response.data) {
            // Atualizando o estado com os dados retornados da API, é feito o map() mais abaixo para posicionar os dados conforme o layout
            setServices(response.data);
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
            alert("Erro ao listar serviços. Tente novamente mais tarde.");
        }

    }

}

/* --------------------------------------------------------------------------------------------------------
 * Função de filterServices
---------------------------------------------------------------------------------------------------------- */

export const filterServices = async (idService, setFiltroServices, navigate) => {

    // Tentar executar a requisição GET
    try {
            
        // Criando a requisição de services para a API usando o método GET
        const response = await api.get("/services/filter", {
            params: {
                id_service: idService
            }
        });

        // Se obteve os dados de retorno da API
        if (response.data) {
            // Atualizando o estado com os dados retornados da API, é feito o map() mais abaixo para posicionar os dados conforme o layout
            setFiltroServices(response.data);
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
            alert("Erro ao filtrar serviços. Tente novamente mais tarde.");
        }

    }

}

/* --------------------------------------------------------------------------------------------------------
 * Função de changeService - 'e' representa o evento que foi disparado quando o ChangeService foi chamado
---------------------------------------------------------------------------------------------------------- */

export const changeService = (e, setIdService) => {

    // Sempre que alterar a option do select, muda o value para mostrar o service selecionado de acordo com o id do service
    setIdService(e.target.value);

}

/* --------------------------------------------------------------------------------------------------------
 * Função de clearInput
---------------------------------------------------------------------------------------------------------- */

export const clearInput = (setIdService) => {

    // Limpa o select, retornando ao seu valor padrão de "Todos os serviços"
    setIdService("");

}