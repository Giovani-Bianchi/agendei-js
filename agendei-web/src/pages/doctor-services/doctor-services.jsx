/*
    * Tela de Services do Doctor
    ----------------------------------------------------------------------------------------------------------
*/

// Importações do react
import { useEffect, useState } from 'react';

// Importações do React Router Dom
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';

// Importações do react-confirm-alert
import { confirmAlert } from 'react-confirm-alert';
// CSS do react-confirm-alert
import 'react-confirm-alert/src/react-confirm-alert.css';

// Importando os toasts
import { toastSuccess } from "../../constants/toast.js";

// Importando as funções de Doctors
import { clickEdit, clickDelete, loadServices } from './doctor-services.functions.js';

// Importando os Styled Components do Componente de Doctors
import { StyledLink, ThButtons } from './doctor-services.styles.js';

// Importando os componentes
import Navbar from "../../components/navbar/navbar.jsx";
import DoctorService from '../../components/doctor-service/doctor-service.jsx';

function DoctorServices() {

    // Instanciando o navigate
    const navigate = useNavigate();

    // Instanciando o location
    const location = useLocation();

    // ID do médico vindo da URL
    const { id_doctor } = useParams();

    // Variável de estado para listar os serviços do médico cadastrado no BD vindos da API
    const [doctorServices, setDoctorServices] = useState([]);

    // Variável de estado para armazenar o nome do médico
    const [doctorName, setDoctorName] = useState("");

    // Lista todos os serviços do médico cadastrado no BD
    useEffect(() => {
        loadServices(id_doctor, setDoctorName, setDoctorServices, navigate);
    }, [])

    // Toasts

    // Variável de estado para controlar o toast
    const [showToast, setShowToast] = useState(false);

    // Variável de estado para armazenar a mensagem do toast
    const [message, setMessage] = useState("");

    // Exibe o toast sempre que o showToast for alterado para true ou se receber um location.state
    useEffect(() => {

        // Se receber uma mensagem do location.state, exibe o toast
        if (location.state?.message) {
            // Exibe o toast
            toastSuccess(location.state.message)

            // Remove a mensagem do estado ao finalizar
            location.state.message = null;
        }

        // Se receber true do showToast, exibe o toast
        if (showToast) {
            // Exibe o toast
            toastSuccess(message);

            // Reseta o controle do toast após exibir
            setShowToast(false);
        }

    }, [showToast, location.state]);

    return <div className='container-fluid mt-page p-4'>
    
        {/* Componente de Navbar */}
        <Navbar />

        {/* Título com Botão de Voltar e de Novo Médico */}
        <div className='d-flex justify-content-center gap-3 mb-4'>
            <h2 className='d-inline'>Serviços {doctorName}</h2>
            <StyledLink className='btn btn-outline-secondary' to={"/doctors"}>Voltar</StyledLink>
            <Link to={`/doctors/${id_doctor}/services/add`} className='btn btn-outline-primary mb-2'>Novo Serviço do Médico</Link>
        </div>

        {/* Tabela de Serviços do Médico CRUD */}
        <div>
            <table className='table table-hover'>  

                {/* Cabeçalho da Tabela */}
                <thead>
                    <tr>
                        <th scope='col'>Serviço</th>
                        <th scope='col'>Preço</th>
                        <ThButtons scope='col'></ThButtons>
                    </tr>
                </thead>

                {/* Corpo da Tabela - Loop carregando várias vezes o componente */}
                <tbody>

                    {/* Se o array doctorServices possuir valores, renderiza a tabela, se não, renderiza a mensagem de que não há serviços do médico */}
                    {doctorServices.length > 0 ? (
                        doctorServices.map((doc) => (
                            <DoctorService key={doc.id_doctor_service}
                                // Passando as props do doctor
                                id_doctor_service={doc.id_doctor_service}
                                service={doc.description}
                                price={doc.price}

                                // Passando as props para os botões de ação, com funções de clique
                                clickEdit={() => clickEdit(id_doctor, doc.id_doctor_service, navigate)}
                                clickDelete={() => clickDelete(doc.id_doctor_service, doc.id_service, id_doctor, confirmAlert, setDoctorName, setDoctorServices, loadServices, setShowToast, setMessage, navigate)}
                            />
                        ))
                    ) : 
                    
                    (
                        <tr>
                            <td colSpan="3" className='text-center'>
                                Nenhum serviço do médico cadastrado
                            </td>
                        </tr>
                    )}

                </tbody>

            </table>
        </div>
    
    </div>

}

// Exportando o componente de DoctorServices
export default DoctorServices;