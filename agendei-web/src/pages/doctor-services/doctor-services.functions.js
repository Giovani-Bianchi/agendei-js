/*
    * Arquivo de Funções do Componente de Services do Doctor
    ----------------------------------------------------------------------------------------------------------
*/

// Importando a API com o Axios
import api from "../../constants/api.js";

/* --------------------------------------------------------------------------------------------------------
 * Função de clickEdit - Passamos o id_doctor_service para identificar qual serviço do médico está querendo editar, assim como o id_doctor, isso está vinculado ao clique do botão de Editar
---------------------------------------------------------------------------------------------------------- */

export const clickEdit = (id_doctor, id_doctor_service, navigate) => {

    // Levando o usuário para a tela de edição passando o ID do doctor e o ID do doctor service
    navigate("/doctors/" + id_doctor + "/services/edit/" + id_doctor_service);

}

/* --------------------------------------------------------------------------------------------------------
 * Função de clickDelete - Passamos o id_doctor_service para identificar qual serviço do médico está querendo excluir, assim como o id_doctor, isso está vinculado ao clique do botão de Excluir
---------------------------------------------------------------------------------------------------------- */

export const clickDelete = (id_doctor_service, id_service, id_doctor, confirmAlert, setDoctorName, setDoctorServices, loadServices, navigate) => {

    // Alert de confirmação para a exclusão do serviço do médico
    confirmAlert({
        title: 'Exclusão',
        message: 'Você tem certeza que deseja excluir esse serviço?',
        buttons: [
            // Botão de confirmar
            {
                label: 'Sim',
                onClick: () => {
                    // Chamando a API para excluir o serviço do médico
                    deleteDoctorService(id_doctor_service, id_service, id_doctor, confirmAlert, setDoctorName, setDoctorServices, loadServices, navigate);
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
 * Função de deleteDoctorService
---------------------------------------------------------------------------------------------------------- */

const deleteDoctorService = async (id_doctor_service, id_service, id_doctor, confirmAlert, setDoctorName, setDoctorServices, loadServices, navigate) => {

    // Tentar executar a requisição DELETE
    try {
            
        // Criando a requisição de doctors services para a API usando o método DELETE
        const response = await api.delete("/doctors/" + id_doctor + "/services/" + id_service + "/" + id_doctor_service);

        // Se o serviço do médico foi excluído, recarrega os serviços do médico de novo
        if (response.data) {
            loadServices(id_doctor, setDoctorName, setDoctorServices, navigate);
        }

        // Se o serviço do médico não foi excluído pois já está vinculado à um agendamento, exibe uma mensagem de erro
        else if (response.data == null) {
            // Alert de erro na exclusão do serviço do médico
            confirmAlert({
                title: 'Erro na exclusão',
                message: 'Erro ao excluir, um ou mais agendamentos estão vinculados a esse serviço.',
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
        if (error.response?.data.error) {
            // Se o usuário não for autorizado a acessar essa tela, redireciona para a tela de login
            if (error.response.status == 401) {
                return navigate('/');
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