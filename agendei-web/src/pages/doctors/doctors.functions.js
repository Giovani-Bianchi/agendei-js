/*
    * Arquivo de Funções do Componente de Doctors
    ----------------------------------------------------------------------------------------------------------
*/

// Importando a API com o Axios
import api from "../../constants/api.js";

/* --------------------------------------------------------------------------------------------------------
 * Função de clickServices - Passamos o id_doctor para identificar qual médico está querendo gerenciar os serviços, isso está vinculado ao clique do botão de Serviços
---------------------------------------------------------------------------------------------------------- */

export const clickServices = (id_doctor, navigate) => {

    // Levando o usuário para a tela de serviços do médico passando o ID do doctor
    navigate("/doctors/" + id_doctor + "/services")

}

/* --------------------------------------------------------------------------------------------------------
 * Função de clickEdit - Passamos o id_doctor para identificar qual médico está querendo editar, isso está vinculado ao clique do botão de Editar
---------------------------------------------------------------------------------------------------------- */

export const clickEdit = (id_doctor, navigate) => {

    // Levando o usuário para a tela de edição passando o ID do doctor
    navigate("/doctors/edit/" + id_doctor)

}

/* --------------------------------------------------------------------------------------------------------
 * Função de clickDelete - Passamos o id_doctor para identificar qual médico está querendo excluir, isso está vinculado ao clique do botão de Excluir
---------------------------------------------------------------------------------------------------------- */

export const clickDelete = (id_doctor, confirmAlert, idDoctor, setFiltroDoctors, filterDoctors, setShowToast, setMessage, navigate) => {

    // Alert de confirmação para a exclusão do médico
    confirmAlert({
        title: 'Exclusão',
        message: 'Você tem certeza que deseja excluir esse médico?',
        buttons: [
            // Botão de confirmar
            {
                label: 'Sim',
                onClick: () => {
                    // Chamando a API para excluir o médico
                    deleteDoctor(id_doctor, confirmAlert, idDoctor, setFiltroDoctors, filterDoctors, setShowToast, setMessage, navigate);
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
 * Função de deleteDoctor
---------------------------------------------------------------------------------------------------------- */

const deleteDoctor = async (id_doctor, confirmAlert, idDoctor, setFiltroDoctors, filterDoctors, setShowToast, setMessage, navigate) => {

    // Tentar executar a requisição DELETE
    try {
            
        // Criando a requisição de doctors para a API usando o método DELETE
        const response = await api.delete("/doctors/" + id_doctor);

        // Se o médico foi excluído, recarrega os médicos de novo
        if (response.data) {
            filterDoctors(idDoctor, setFiltroDoctors, navigate);

            // Toast de sucesso
            setMessage("Médico excluído com sucesso!");
            setShowToast(true);
        }

        // Se o médico não foi excluído pois já está vinculado à um agendamento, exibe uma mensagem de erro
        else if (response.data == null) {
            // Alert de erro na exclusão do médico
            confirmAlert({
                title: 'Erro na exclusão',
                message: 'Erro ao excluir, um ou mais agendamentos estão vinculados a esse médico.',
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
 * Função de filterDoctors
---------------------------------------------------------------------------------------------------------- */

export const filterDoctors = async (idDoctor, setFiltroDoctors, navigate) => {

    // Tentar executar a requisição GET
    try {
            
        // Criando a requisição de doctors para a API usando o método GET
        const response = await api.get("/doctors/filter", {
            params: {
                id_doctor: idDoctor
            }
        });

        // Se obteve os dados de retorno da API
        if (response.data) {
            // Atualizando o estado com os dados retornados da API, é feito o map() mais abaixo para posicionar os dados conforme o layout
            setFiltroDoctors(response.data);
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
            alert("Erro ao filtrar médicos. Tente novamente mais tarde.");
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

/* --------------------------------------------------------------------------------------------------------
 * Função de clearInput
---------------------------------------------------------------------------------------------------------- */

export const clearInput = (setIdDoctor) => {

    // Limpa o select, retornando ao seu valor padrão de "Todos os médicos"
    setIdDoctor("");

}