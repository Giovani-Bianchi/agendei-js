/*
    * Tela de Agendamentos
    ----------------------------------------------------------------------------------------------------------
*/

// Importações do react
import { useEffect, useState } from 'react';

// Importações do React Router Dom
import { Link, useNavigate } from 'react-router-dom';

// Importações do react-confirm-alert
import { confirmAlert } from 'react-confirm-alert';
// CSS do react-confirm-alert
import 'react-confirm-alert/src/react-confirm-alert.css';

// Importando as funções de Appointments
import { clickEdit, clickDelete, loadDoctors, loadAppointments, changeDoctor } from './appointments.functions.js';

// Importando os Styled Components do Componente de Appointments
import { ThButtons } from './appointments.styles.js';

// Importando os componentes
import Navbar from "../../components/navbar/navbar.jsx";
import Appointment from '../../components/appointment/appointment.jsx';

function Appointments() {

    // Instanciando o navigate
    const navigate = useNavigate();

    // Variável de estado para que toda vez que ela seja alterada, a página seja recarregada para listar os appointments
    const [appointments, setAppointments] = useState([]);

    // Variável de estado para listar os médicos cadastrados no BD vindos da API
    const [doctors, setDoctors] = useState([]);
    
    // Variável de estado para armazenar o id do médico selecionado, começa com o valor de nulo sendo uma string
    const [idDoctor, setIdDoctor] = useState("");

    // Variável de estado para armazenar a data inicial
    const [dtStart, setDtStart] = useState("");

    // Variável de estado para armazenar a data final
    const [dtEnd, setDtEnd] = useState("");

    // Lista todos os appointments e doctors quando o componente é montado (que seria a chaves [] vazia)
    useEffect(() => {
        loadDoctors(setDoctors, navigate);
        loadAppointments(idDoctor, dtStart, dtEnd, setAppointments, navigate);
    }, [])

    return <div className='container-fluid mt-page p-4'>
    
        {/* Componente de Navbar */}
        <Navbar />

        {/* Seção de Filtros */}
        <div className="d-flex justify-content-between align-itens-center">

            {/* Título com Botão de Novo Agendamento */}
            <div className='mb-4'>
                <h2 className='d-inline'>Agendamentos</h2>
                <Link to="/appointments/add" className='btn btn-outline-primary ms-4 mb-2'>Novo Agendamento</Link>
            </div>

            {/* Filtros dos Agendamentos e Botão Filtrar */}
            <div className='d-flex align-items-center mb-4'>

                {/* Inputs de Data */}
                <input type="date" id='startDate' className='form-control' onChange={(e) => setDtStart(e.target.value)} /> {/* Captura o valor e atribui a variável dtStart */}
                <span className='mx-2'>Até</span>
                <input type="date" id='endDate' className='form-control' onChange={(e) => setDtEnd(e.target.value)} /> {/* Captura o valor e atribui a variável dtEnd */}

                {/* Select para escolher o Médico */}
                <div className='form-control mx-3'>
                    {/* Valor padrão do select é o valor do id_doctor, e toda vez que mudar o médico selecionado, o ChangeDoctor altera o id_doctor do value */}
                    <select name='doctor' id='doctor' value={idDoctor} onChange={(e) => changeDoctor(e, setIdDoctor)}>
                        <option value="">Todos os médicos</option>

                        {/* Opções do Select  */}
                        {   
                            // O map() irá percorrer todo o array doctors e para cada elemento que ele encontrar no array, chama essa função, é um loop para criar opções do        Select. O doc é o objeto que irá conter os dados do médico a cada vez que ele percorrer o array
                            doctors.map((doc) => {
                                return <option key={doc.id_doctor} value={doc.id_doctor}>{doc.name}</option>
                            })
                        }
                    </select>
                </div>

                {/* Botão de Filtrar */}
                <button type='button' className='btn btn-primary' onClick={() => loadAppointments(idDoctor, dtStart, dtEnd, setAppointments, navigate)}>Filtrar</button>

            </div>

        </div>

        {/* Tabela de Agendamentos CRUD */}
        <div>
            <table className='table table-hover'>  

                {/* Cabeçalho da Tabela */}
                <thead>
                    <tr>
                        <th scope='col'>Paciente</th>
                        <th scope='col'>Médico</th>
                        <th scope='col'>Serviço</th>
                        <th scope='col'>Data/Hora</th>
                        <th scope='col' className='text-end'>Valor</th>
                        <ThButtons scope='col'></ThButtons>
                    </tr>
                </thead>

                {/* Corpo da Tabela - Loop carregando várias vezes o componente */}
                <tbody>
                    {
                        appointments.map((ap) => {
                            return <Appointment key={ap.id_appointment}
                                // Passando as props do appointment
                                id_appointment={ap.id_appointment}
                                user={ap.user}
                                doctor={ap.doctor}
                                service={ap.service}
                                booking_date={ap.booking_date}
                                booking_hour={ap.booking_hour}
                                price={ap.price}

                                // Passando as props para os botões de ação, com funções de clique
                                clickEdit={() => clickEdit(ap.id_appointment, navigate)}
                                clickDelete={() => clickDelete(ap.id_appointment, confirmAlert, idDoctor, dtStart, dtEnd, setAppointments, loadAppointments, navigate)}
                            />
                        })
                    }
                </tbody>

            </table>
        </div>
    
    </div>

}

// Exportando o componente de appointments
export default Appointments;