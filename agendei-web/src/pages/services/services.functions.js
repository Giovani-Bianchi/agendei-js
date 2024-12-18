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
 * Função de clickDelete - Passamos o id_service para identificar qual serviço está querendo excluir, isso está vinculado ao clique do botão de Excluir
---------------------------------------------------------------------------------------------------------- */

export const clickDelete = (id_service, confirmAlert, idService, setFiltroServices, navigate, setShowToast, setMessage, filterServices) => {

    // Alert de confirmação para a exclusão do serviço
    confirmAlert({
        title: 'Exclusão',
        message: 'Você tem certeza que deseja excluir esse serviço?',
        buttons: [
            // Botão de confirmar
            {
                label: 'Sim',
                onClick: () => {
                    // Chamando a API para excluir o serviço
                    deleteService(id_service, confirmAlert, idService, setFiltroServices, navigate, setShowToast, setMessage, filterServices);
                }
            },

            // Botão de voltar
            {
                label: 'Não',
                // Não está sendo feito nada quando o botão de não é clicado
                onClick: () => {}
            }
        ]
    });

}

/* --------------------------------------------------------------------------------------------------------
 * Função de deleteService
---------------------------------------------------------------------------------------------------------- */

const deleteService = async (id_service, confirmAlert, idService, setFiltroServices, navigate, setShowToast, setMessage, filterServices) => {

    // Tentar executar a requisição DELETE
    try {
            
        // Criando a requisição de services para a API usando o método DELETE
        const response = await api.delete("/services/" + id_service);

        // Se o serviço foi excluído, recarrega os serviços de novo
        if (response.data) {
            filterServices(idService, setFiltroServices, navigate);

            // Toast de sucesso
            setMessage("Serviço excluído com sucesso!");
            setShowToast(true);
        }

        // Se o serviço não foi excluído pois já está vinculado à um agendamento ou à um médico, exibe uma mensagem de erro
        else if (response.data == null) {
            // Alert de erro na exclusão do serviço
            confirmAlert({
                title: 'Erro na exclusão',
                message: 'Erro ao excluir, um ou mais agendamentos ou médicos estão vinculados a esse serviço.',
                buttons: [
                    // Botão de voltar
                    {
                        label: 'Voltar',
                        onClick: () => {}
                    },
                ]
            });
        }
        
    }
    
    // Se não conseguir, trata o erro que ocorreu, aqui é para erros que vieram do servidor (API)
    catch (error) {

        // Se dentro do error, conseguiu obter o response e dentro do response existe a propriedade data e dentro da data há qual é o erro (? significa que pode não existir)
        if (error.response?.data?.error) {
            // Se o usuário não for autorizado a acessar essa tela, redireciona para a tela de login
            if (error.response.status == 401) {
                return navigate('/login');
            }

            alert(error.response?.data.error);
        }

        // Se não conseguiu obter qual é o erro vindo do servidor, então exibe a mensagem de erro padrão
        else {
            alert("Erro ao excluir dados. Tente novamente mais tarde.");
        }

    }

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
                return navigate('/login');
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
                return navigate('/login');
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