/*
    * Tela de Adicionar/Editar Agendamento
    ----------------------------------------------------------------------------------------------------------
*/

// Importações do react
import { useEffect, useState } from "react";

// Importações do React Router Dom
import { Link, useNavigate, useParams } from "react-router-dom";

// Importando as funções do Appointment Add
import { loadUsers, loadDoctors, loadServices, saveAppointment } from "./appointment-add.functions.js";

// Importando os componentes
import Navbar from "../../components/navbar/navbar.jsx";

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

    // Função para verificar se todos os campos estão preenchidos
    const isFormValid =
        idUser !== "" && idUser !== "0" &&
        idDoctor !== "" && idDoctor !== "0" &&
        idService !== "" && idService !== "0" &&
        bookingDate !== "" && 
        bookingHour !== "";

    // Faz uma função toda vez que o componente for montado, carregando a lista de pacientes e médicos
    useEffect(() => {
        loadUsers(setUsers, navigate);
        loadDoctors(setDoctors, id_appointment, setIdUser, setIdDoctor, setIdService, setBookingDate, setBookingHour, navigate);
    }, []);

    // useEffect para os serviços, que não pode ser carregado toda vez que a página é carregada, pois os serviços tem que ser carregados conforme o médico escolhido, para selecionar apenas os serviços referente àquele médico. O critério para esse useEffect é toda vez que a variável de médico for alterada no select
    useEffect(() => {
        // Carrega todos os serviços para o médico com o id informado
        loadServices(idDoctor, setServices, navigate);
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
                    <h2>{id_appointment > 0 ? "Editar Agendamento" : "Novo Agendamento"}</h2>
                </div>

                {/* Select com a lista de pacientes */}
                <div className="col-12 mt-4">
                    <label htmlFor="user" className="form-label">Paciente</label>
                    <div className='form-control mb-2'>
                        <select name='user' id='user' value={idUser} onChange={(e) => setIdUser(e.target.value)}>
                            {/* Se a variável idUser for vazia, mostra a opção de Selecione o paciente, senão, não mostra */}
                            {idUser === "" && (
                                <option value="" disabled hidden>
                                    Selecione o paciente
                                </option>
                            )}

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
                            {/* Se a variável idDoctor for vazia, mostra a opção de Selecione o médico, senão, não mostra */}
                            {idDoctor === "" && (
                                <option value="" disabled hidden>
                                    Selecione o médico
                                </option>
                            )}

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
                            {/* Se a variável idService for vazia, mostra a opção de Selecione o serviço, senão, não mostra */}
                            {idService === "" && (
                                <option value="" disabled hidden>
                                    Selecione o serviço
                                </option>
                            )}

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
                            {/* Se a variável bookingHour for vazia, mostra a opção de Horário, senão, não mostra */}
                            {bookingHour === "" && (
                                <option value="" disabled hidden>
                                    Horário
                                </option>
                            )}
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
                        <button type="button" className="btn btn-primary" disabled={!isFormValid} onClick={() => saveAppointment(idUser, idDoctor, idService, bookingDate, bookingHour, id_appointment, navigate)}>Salvar Dados</button>
                    </div>
                </div>

            </div>
        </div>
    
    </>

}

// Exportando a função AppointmentAdd
export default AppointmentAdd;