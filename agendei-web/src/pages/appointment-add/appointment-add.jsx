/*
    ? Tela de Adicionar/Editar Agendamento
    ----------------------------------------------------------------------------------------------------------
    * Aqui ficará a criação de um novo agendamento ou a edição, depende se estará recebendo um id, caso esteja, será uma edição. Isso será verificado nas rotas
*/

// Importando o CSS da tela de Adicionar Agendamento
import "./appointment-add.css";

// Importações do React Router Dom
import { Link, useNavigate, useParams } from "react-router-dom";

// Importando os componentes
import Navbar from "../../components/navbar/navbar.jsx";

// Importações do react
import { useEffect, useState } from "react";

// Importação da API
import api from "../../constants/api.js";

function AppointmentAdd() {

    // Instanciando o navigate
    const navigate = useNavigate();

    // Constante de id do appointment, ao carregar essa tela, o useParams irá tentar pegar o id da URL, se ele conseguir, significa que é uma edição, senão, é uma criação
    const { id_appointment } = useParams();

    // Variável de estado de users para carregar os dados dos pacientes
    const [users, setUsers] = useState([]);

    // Variável de estado de serviços para carregar os dados dos serviços do médico
    const [services, setServices] = useState([]);

    // Variável de estado de doctors para carregar os dados dos médicos
    const [doctors, setDoctors] = useState([]);

    // Variáveis de estado para cada campo nos inputs
    const [idUser, setIdUser] = useState("");
    const [idDoctor, setIdDoctor] = useState("");
    const [idService, setIdService] = useState("");
    const [bookingDate, setBookingDate] = useState("");
    const [bookingHour, setBookingHour] = useState("");

    // Função para carregar os pacientes
    async function LoadUsers() {

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
                    return navigate('/');
                }

                alert(error.response?.data.error);
            }

            // Se não conseguiu obter qual é o erro vindo do servidor, então exibe a mensagem de erro padrão
            else {
                alert("Erro ao listar pacientes. Tente novamente mais tarde.");
            }

        }

    }

    // Função para carregar os médicos
    async function LoadDoctors() {

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
                    LoadAppointments(id_appointment);
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
                alert("Erro ao listar médicos. Tente novamente mais tarde.");
            }

        }

    }

    // Função para carregar os dados do agendamento com base no id_appointment
    async function LoadAppointments(id) {

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

    // Função para carregar os serviços
    async function LoadServices(id) {

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

    // Função para salvar/editar o agendamento
    async function SaveAppointment() {
        
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

            // Se conseguiu inserir o agendamento, redireciona o usuário para a lista
            if (response.data) {
                navigate("/appointments");
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

    // Faz uma função toda vez que o componente for montado, carregando a lista de pacientes e médicos
    useEffect(() => {
        LoadUsers();
        LoadDoctors();
    }, []);

    // useEffect para os serviços, que não pode ser carregado toda vez que a página é carregada, pois os serviços tem que ser carregados conforme o médico escolhido, para selecionar apenas os serviços referente àquele médico. O critério para esse useEffect é toda vez que a variável de médico for alterada no select
    useEffect(() => {
        // Carrega todos os serviços para o médico com o id informado
        LoadServices(idDoctor);
    }, [idDoctor]);

    return <>
    
        {/* Renderizando a Navbar */}
        <Navbar />

        {/* Form de Criação de Agendamento */}
        <div className='container-fluid mt-page'>
            <div className="row col-lg-4 offset-lg-4">

                {/* Título de Nova Agendamento */}
                <div className="col-12 mt-2">
                    {/* Se o id_appointment foi maior que 0, significa que é edição, então coloca o título "Editar Agendamento", senão, coloca "Nova Agendamento", que é criação */}
                    <h2>{id_appointment > 0 ? "Editar Agendamento" : "Nova Agendamento"}</h2>
                </div>

                {/* Select com a lista de pacientes */}
                <div className="col-12 mt-4">
                    <label htmlFor="user" className="form-label">Paciente</label>
                    <div className='form-control mb-2'>
                        <select name='user' id='user' value={idUser} onChange={(e) => setIdUser(e.target.value)}>
                            <option value='0'>Selecione o paciente</option>

                            {/* Opções do Select  */}
                            {   
                                // O map() irá percorrer todo o array doctors e para cada elemento que ele encontrar no array, chama essa função, é um loop para criar opções do        Select. O 'u' é o objeto que irá conter os dados do paciente a cada vez que ele percorrer o array
                                users.map((u) => {
                                    return <option key={u.id_user} value={u.id_user}>{u.name}</option>
                                })
                            }
                        </select>
                    </div>
                </div>

                {/* Select com a lista de médicos */}
                <div className="col-12 mt-4">
                    <label htmlFor="doctor" className="form-label">Médico</label>
                    <div className='form-control mb-2'>
                        <select name='doctor' id='doctor' value={idDoctor} onChange={(e) => setIdDoctor(e.target.value)}>
                            <option value='0'>Selecione o médico</option>

                            {/* Opções do Select  */}
                            {   
                                // O map() irá percorrer todo o array doctors e para cada elemento que ele encontrar no array, chama essa função, é um loop para criar opções do        Select. O doc é o objeto que irá conter os dados do médico a cada vez que ele percorrer o array
                                doctors.map((doc) => {
                                    return <option key={doc.id_doctor} value={doc.id_doctor}>{doc.name}</option>
                                })
                            }
                        </select>
                    </div>
                </div>

                {/* Select com a lista de serviços */}
                <div className="col-12 mt-3">
                    <label htmlFor="service" className="form-label">Serviço</label>
                    <div className='form-control mb-2'>
                        <select name='service' id='service' value={idService} onChange={(e) => setIdService(e.target.value)}>
                            <option value='0'>Selecione o serviço</option>

                            {/* Opções do Select  */}
                            {   
                                services.map((serv) => {
                                    return <option key={serv.id_service} value={serv.id_service}>{serv.description}</option>
                                })
                            }
                        </select>
                    </div>
                </div>

                {/* Input de Data */}
                <div className="col-6 mt-3">
                    <label htmlFor="bookingDate" className="form-label">Data</label>
                    <input type="date" name="bookingDate" id="bookingDate" className="form-control" value={bookingDate} onChange={(e) => setBookingDate(e.target.value)}/>
                </div>

                {/* Select com a lista de horários */}
                <div className="col-6 mt-3">
                    <label htmlFor="bookingHour" className="form-label">Horário</label>
                    <div className="form-control mb-2">
                        <select name="bookingHour" id="bookingHour" value={bookingHour} onChange={(e) => setBookingHour(e.target.value)}>
                            <option value="00:00">Horário</option>
                            <option value="09:00">9:00</option>
                            <option value="09:30">9:30</option>
                            <option value="10:00">10:00</option>
                            <option value="10:30">10:30</option>
                            <option value="11:00">11:00</option>
                        </select>
                    </div>
                </div>

                {/* Botões */}
                <div className="col-12 mt-4">
                    <div className="d-flex justify-content-end gap-2">
                        <Link to="/appointments" className="btn btn-outline-primary">Cancelar</Link>
                        <button type="button" className="btn btn-primary" onClick={SaveAppointment}>Salvar Dados</button>
                    </div>
                </div>

            </div>
        </div>
    
    </>

}

// Exportando a função AppointmentAdd
export default AppointmentAdd;