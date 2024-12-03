/*
    * Arquivo de Funções do Componente de Services do Doctor
    ----------------------------------------------------------------------------------------------------------
*/

// Importando a API com o Axios
import api from "../../constants/api.js";

/* --------------------------------------------------------------------------------------------------------
 * Função de loadServices
---------------------------------------------------------------------------------------------------------- */

export const loadServices = async (id_doctor, setDoctorName, setDoctorServices, navigate) => {

    // Tentar executar a requisição GET
    try {
            
        // Criando a requisição de doctor services para a API usando o método GET
        const response = await api.get("/doctors/" + id_doctor + "/services");

        // Se obteve os dados de retorno da API
        if (response.data) {
            // Atualizando o estado com os dados retornados da API, é feito o map() mais abaixo para posicionar os dados conforme o layout
            setDoctorServices(response.data);

            // Atualizando a variável com o nome do médico
            setDoctorName(response.data[0].name)
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
            alert("Erro ao listar serviços do médico. Tente novamente mais tarde.");
        }

    }

}