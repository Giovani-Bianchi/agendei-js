/*
    * Arquivo de Funções do Componente de Doctor Services Add
    ----------------------------------------------------------------------------------------------------------
*/

// Importação da API
import api from "../../constants/api.js";

/* --------------------------------------------------------------------------------------------------------
 * Função para carregar os serviços
---------------------------------------------------------------------------------------------------------- */

export const loadServices = async (setServices, navigate) => {

    // Tentar executar a requisição GET
    try {
            
        // Criando a requisição de serviços para a API usando o método GET
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
 * Função para salvar/editar o serviço do médico
---------------------------------------------------------------------------------------------------------- */

export const saveDoctorService = async (id_doctor_service, id_doctor, idService, price, navigate) => {
        
    // Objeto json para armazenar os dados do serviço do médico para o salvamento, nomeando a qual campo cada variável pertence quando fizer o POST. Estamos puxando os valores das nossas variáveis de estado conforme o que o usuário escolheu
    const json = {
        id_doctor,
        id_service: idService,
        price
    }

    // Tentar salvar o serviço do médico com a requisição para a API
    try {
            
        // Criando a requisição de novo/editar médico para a API, o segundo parâmetro é o que vai no corpo da requisição, passamos o objeto json contendo os valores para ele. Se o id_doctor for maior que 0 (ou seja, se ele existe), então é um médico existente e vamos editar, caso contrário, é um novo médico
        const response = id_doctor_service > 0 ? 
        await api.put("/doctors/" + id_doctor + "/services/" + id_doctor_service, json) : 
        await api.post("/doctors/" + id_doctor + "/services", json);

        // Se conseguiu inserir o médico, redireciona o usuário para a lista
        if (response.data) {
            navigate("/doctors/" + id_doctor + "/services");
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