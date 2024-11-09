/*
    * Tela de Agendamentos
    ----------------------------------------------------------------------------------------------------------
*/

// Importando o CSS dos Appointments
import './appointments.css';

// Importando os componentes
import Navbar from "../../components/navbar/navbar.jsx";
import Appointment from '../../components/appointment/appointment.jsx';

// Importações do react
import { useEffect, useState } from 'react';

// Importações do React Router Dom
import { Link, useNavigate } from 'react-router-dom';

// Importações do react-confirm-alert
import { confirmAlert } from 'react-confirm-alert';
// CSS do react-confirm-alert
import 'react-confirm-alert/src/react-confirm-alert.css';

// Importando a API com o Axios
import api from "../../constants/api.js";

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

    // Função de ClickEdit - Passamos o id_appointment para identificar qual agendamento está querendo editar, isso está vinculado ao clique do botão de Editar
    function ClickEdit(id_appointment) {

        // Levando o usuário para a tela de edição passando o ID do appointment
        navigate("/appointments/edit/" + id_appointment)

    }

    // Função de ClickDelete - Passamos o id_appointment para identificar qual agendamento está querendo excluir, isso está vinculado ao clique do botão de Excluir
    function ClickDelete(id_appointment) {

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
                        DeleteAppointment(id_appointment);
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

    // Função de DeleteAppointment
    async function DeleteAppointment(id) {

        // Tentar executar a requisição DELETE
        try {
            
            // Criando a requisição de appointments para a API usando o método DELETE
            const response = await api.delete("/appointments/" + id);

            // Se o agendamento foi excluído, recarrega os agendamentos de novo
            if (response.data) {
                LoadAppointments();
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

    // Função de LoadDoctors
    async function LoadDoctors() {

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

    // Função de LoadAppointments
    async function LoadAppointments() {

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

    // Função de ChangeDoctor - 'e' representa o evento que foi disparado quando o ChangeDoctor foi chamado
    function ChangeDoctor(e) {

        // Sempre que alterar a option do select, muda o value para mostrar o médico selecionado de acordo com o id do médico
        setIdDoctor(e.target.value);

    }

    // Lista todos os appointments e doctors quando o componente é montado (que seria a chaves [] vazia)
    useEffect(() => {
        LoadDoctors();
        LoadAppointments();
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
                    <select name='doctor' id='doctor' value={idDoctor} onChange={ChangeDoctor}>
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
                <button type='button' className='btn btn-primary' onClick={LoadAppointments}>Filtrar</button>

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
                        <th scope='col' className='col-buttons'></th>
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
                                clickEdit={ClickEdit}
                                clickDelete={ClickDelete}
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