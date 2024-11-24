/*
    * Arquivo de Funções do Componente de Appointments
    ----------------------------------------------------------------------------------------------------------
*/

// Importando a API com o Axios
import api from "../../constants/api.js";

/* --------------------------------------------------------------------------------------------------------
 * Função de clickEdit - Passamos o id_appointment para identificar qual agendamento está querendo editar, isso está vinculado ao clique do botão de Editar
---------------------------------------------------------------------------------------------------------- */

export const clickEdit = (id_appointment, navigate) => {

    // Levando o usuário para a tela de edição passando o ID do appointment
    navigate("/appointments/edit/" + id_appointment)

}

/* --------------------------------------------------------------------------------------------------------
 * Função de clickDelete - Passamos o id_appointment para identificar qual agendamento está querendo excluir, isso está vinculado ao clique do botão de Excluir
---------------------------------------------------------------------------------------------------------- */

export const clickDelete = (id_appointment, confirmAlert, idDoctor, dtStart, dtEnd, setAppointments, loadAppointments, navigate) => {

    // Alert de confirmação para a exclusão do agendamento
    confirmAlert({
        title: 'Exclusão',
        message: 'Você tem certeza que deseja excluir esse agendamento?',
        buttons: [
            // Botão de confirmar
            {
                label: 'Sim',
                onClick: () => {
                    // Chamando a API para excluir o agendamento
                    deleteAppointment(id_appointment, idDoctor, dtStart, dtEnd, setAppointments, loadAppointments, navigate);
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
 * Função de deleteAppointment
---------------------------------------------------------------------------------------------------------- */

const deleteAppointment = async (id, idDoctor, dtStart, dtEnd, setAppointments, loadAppointments, navigate) => {

    // Tentar executar a requisição DELETE
    try {
            
        // Criando a requisição de appointments para a API usando o método DELETE
        const response = await api.delete("/appointments/" + id);

        // Se o agendamento foi excluído, recarrega os agendamentos de novo
        if (response.data) {
            loadAppointments(idDoctor, dtStart, dtEnd, setAppointments, navigate);
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
 * Função de loadDoctors
---------------------------------------------------------------------------------------------------------- */

export const loadDoctors = async (setDoctors, navigate) => {

    // Tentar executar a requisição GET
    try {
            
        // Criando a requisição de doctors para a API usando o método GET
        const response = await api.get("/doctors");

        // Se obteve os dados de retorno da API
        if (response.data) {
            // Atualizando o estado com os dados retornados da API, é feito o map() mais abaixo para posicionar os dados conforme o layout
            setDoctors(response.data);
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
            alert("Erro ao listar médicos. Tente novamente mais tarde.");
        }

    }

}

/* --------------------------------------------------------------------------------------------------------
 * Função de loadAppointments
---------------------------------------------------------------------------------------------------------- */

export const loadAppointments = async (idDoctor, dtStart, dtEnd, setAppointments, navigate) => {

    // Tentar executar a requisição GET
    try {
            
        // Criando a requisição de Appointments para a API usando o método GET
        const response = await api.get("/admin/appointments", {
            // É aqui que insere os parâmetros que serão enviados para a API para fazer o filtro
            params: {
                id_doctor: idDoctor,
                dt_start: dtStart,
                dt_end: dtEnd
            }
        });

        // Se obteve os dados de retorno da API
        if (response.data) {
            // Atualizando o estado com os dados retornados da API, é feito o map() mais abaixo para posicionar os dados conforme o layout
            setAppointments(response.data);
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
            alert("Erro ao efetuar login. Tente novamente mais tarde.");
        }

    }

}

/* --------------------------------------------------------------------------------------------------------
 * Função de changeDoctor - 'e' representa o evento que foi disparado quando o ChangeDoctor foi chamado
---------------------------------------------------------------------------------------------------------- */

export const changeDoctor = (e, setIdDoctor) => {

    // Sempre que alterar a option do select, muda o value para mostrar o médico selecionado de acordo com o id do médico
    setIdDoctor(e.target.value);

}