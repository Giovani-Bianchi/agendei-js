/*
    * Arquivo de Funções do Componente de Appointments Add
    ----------------------------------------------------------------------------------------------------------
*/

// Importação da API
import api from "../../constants/api.js";

/* --------------------------------------------------------------------------------------------------------
 * Função para carregar os pacientes
---------------------------------------------------------------------------------------------------------- */

export const loadUsers = async (setUsers, navigate) => {

    // Tentar executar a requisição GET
    try {
            
        // Criando a requisição de pacientes para a API usando o método GET
        const response = await api.get("/admin/users");

        // Se obteve os dados de retorno da API
        if (response.data) {
            // Atualizando o estado com os dados retornados da API, é feito o map() mais abaixo para posicionar os dados conforme o layout
            setUsers(response.data);
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
            alert("Erro ao listar pacientes. Tente novamente mais tarde.");
        }

    }

}

/* --------------------------------------------------------------------------------------------------------
 * Função para carregar os médicos
---------------------------------------------------------------------------------------------------------- */

export const loadDoctors = async (setDoctors, id_appointment, setIdUser, setIdDoctor, setIdService, setBookingDate, setBookingHour, navigate) => {

    // Tentar executar a requisição GET
    try {
            
        // Criando a requisição de doctors para a API usando o método GET
        const response = await api.get("/doctors");

        // Se obteve os dados de retorno da API
        if (response.data) {
            // Atualizando o estado com os dados retornados da API, é feito o map() mais abaixo para posicionar os dados conforme o layout
            setDoctors(response.data);

            // Se for modo de edição
            if (id_appointment > 0) {
                // Carrega os dados do agendamento
                loadAppointments(id_appointment, setIdUser, setIdDoctor, setIdService, setBookingDate, setBookingHour, navigate);
            }
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
            alert("Erro ao listar médicos. Tente novamente mais tarde.");
        }

    }

}

/* --------------------------------------------------------------------------------------------------------
 * Função para carregar os dados do agendamento com base no id_appointment
---------------------------------------------------------------------------------------------------------- */

const loadAppointments = async (id, setIdUser, setIdDoctor, setIdService, setBookingDate, setBookingHour, navigate) => {

    // Tentar executar a requisição GET
    try {
            
        // Criando a requisição de capturar os dados do appointment pelo ID para a API usando o método GET
        const response = await api.get("/admin/appointments/" + id);

        // Se obteve os dados de retorno da API, irá popular cada uma das variáveis de estado com os dados retornados da API, para preparar para a alteração futuramente
        if (response.data) {
            setIdUser(response.data.id_user);
            setIdDoctor(response.data.id_doctor);
            setIdService(response.data.id_service);
            setBookingDate(response.data.booking_date);
            setBookingHour(response.data.booking_hour);
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
 * Função para carregar os serviços
---------------------------------------------------------------------------------------------------------- */

export const loadServices = async (id, setServices, navigate) => {

    // Se a função foi chamada e não existe um id sendo passado, então não é possível carregar os serviços, faz o return para sair da função
    if (!id) {
        return;
    }

    // Tentar executar a requisição GET
    try {
            
        // Criando a requisição de serviços para a API usando o método GET
        const response = await api.get("/doctors/" + id + "/services");

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
 * Função para salvar/editar o agendamento
---------------------------------------------------------------------------------------------------------- */

export const saveAppointment = async (idUser, idDoctor, idService, bookingDate, bookingHour, id_appointment, navigate) => {
        
    // Objeto json para armazenar os dados do agendamento para o salvamento, nomeando a qual campo cada variável pertence quando fizer o POST. Estamos puxando os valores das nossas variáveis de estado conforme o que o usuário escolheu
    const json = {
        id_user: idUser, 
        id_doctor: idDoctor, 
        id_service: idService, 
        booking_date: bookingDate, 
        booking_hour: bookingHour
    }

    // Tentar salvar o agendamento com a requisição para a API
    try {
            
        // Criando a requisição de novo/editar agendamento para a API, o segundo parâmetro é o que vai no corpo da requisição, passamos o objeto json contendo os valores para ele. Se o id_appointment for maior que 0 (ou seja, se ele existe), então é um agendamento existente e vamos editar, caso contrário, é um novo agendamento
        const response = id_appointment > 0 ? 
        await api.put("/admin/appointments/" + id_appointment, json) : 
        await api.post("/admin/appointments", json);

        // Se conseguiu inserir ou editar o agendamento, redireciona o usuário para a lista
        if (response.data) {
            if (id_appointment > 0) {
                navigate("/appointments", { 
                    state: { message: "Agendamento editado com sucesso!" } 
                });
            }

            else {
                navigate("/appointments", { 
                    state: { message: "Agendamento salvo com sucesso!" } 
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
                return navigate('/login');
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
 * Função para lidar com a alteração do médico no select
---------------------------------------------------------------------------------------------------------- */

export const doctorChange = (e, idDoctor, setIsDoctorChanged, setIdDoctor) => {
    
    // Verifica se o valor selecionado no select (e.target.value) é diferente do ID do médico atual (idDoctor)
    if (e.target.value !== idDoctor) {
        // Marca o estado 'isDoctorChanged' como true, indicando que o médico foi alterado
        setIsDoctorChanged(true);

        // Atualiza o estado 'idDoctor' com o novo valor selecionado no select
        setIdDoctor(e.target.value);
    }

};