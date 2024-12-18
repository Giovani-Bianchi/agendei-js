/*
    * Tela de Services
    ----------------------------------------------------------------------------------------------------------
*/

// Importações do react
import { useEffect, useState } from 'react';

// Importações do React Router Dom
import { Link, useLocation, useNavigate } from 'react-router-dom';

// Importações do react-confirm-alert
import { confirmAlert } from 'react-confirm-alert';
// CSS do react-confirm-alert
import 'react-confirm-alert/src/react-confirm-alert.css';

// Importando os toasts
import { toastSuccess } from "../../constants/toast.js";

// Importando as funções de Services
import { clickEdit, clickDelete, loadServices, filterServices, changeService, clearInput } from './services.functions.js';

// Importando os Styled Components do Componente de Services
import { ThButtons } from '../services/services.styles.js';

// Importando os componentes
import Navbar from "../../components/navbar/navbar.jsx";
import Service from "../../components/service/service.jsx";

function Services() {

    // Instanciando o navigate
    const navigate = useNavigate();

    // Instanciando o location
    const location = useLocation();

    // Variável de estado para armazenar os serviços
    const [services, setServices] = useState([]);

    // Variável de estado para armazenar os serviços filtrados
    const [filtroServices, setFiltroServices] = useState([]);

    // Variável de estado para armazanar a troca de ID do select de serviços
    const [idService, setIdService] = useState("");

    // Carrega os serviços quando a página é carregada
    useEffect(() => {
        loadServices(setServices, navigate);
        filterServices(idService, setFiltroServices, navigate);
    }, [idService, services])

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

        {/* Seção de Filtros */}
        <div className="d-flex justify-content-between align-itens-center">

            {/* Título com Botão de Novo Serviço */}
            <div className='mb-4'>
                <h2 className='d-inline'>Serviços</h2>
                <Link to="/services/add" className='btn btn-outline-primary ms-4 mb-2'>Novo Serviço</Link>
            </div>

            {/* Filtros dos Serviços e Botão Filtrar */}
            <div className='d-flex align-items-center mb-4'>

                {/* Select para escolher o Serviço */}
                <div className='form-control mx-3'>
                    {/* Valor padrão do select é o valor do id_service, e toda vez que mudar o médico selecionado, o ChangeService altera o id_service do value */}
                    <select name='service' id='service' value={idService} onChange={(e) => changeService(e, setIdService)}>
                        <option value="">Todos os serviços</option>

                        {/* Opções do Select  */}
                        {   
                            // O map() irá percorrer todo o array services e para cada elemento que ele encontrar no array, chama essa função, é um loop para criar opções do       Select. O ser é o objeto que irá conter os dados do serviço a cada vez que ele percorrer o array
                            services.map((ser) => {
                                return <option key={ser.id_service} value={ser.id_service}>{ser.description}</option>
                            })
                        }
                    </select>
                </div>

                {/* Botão de Limpar */}
                <button type='button' className='btn btn-primary' onClick={() => clearInput(setIdService)}>Limpar</button>

            </div>

        </div>

        {/* Tabela de Serviços CRUD */}
        <div>
            <table className='table table-hover'>  

                {/* Cabeçalho da Tabela */}
                <thead>
                    <tr>
                        <th scope='col'>Serviço</th>
                        <ThButtons scope='col'></ThButtons>
                    </tr>
                </thead>

                {/* Corpo da Tabela - Loop carregando várias vezes o componente */}
                <tbody>
                    
                    {/* Se o array filtroServices possuir valores, renderiza a tabela, se não, renderiza a mensagem de que não há serviços */}
                    {filtroServices.length > 0 ? (
                        filtroServices.map((ser) => (
                            <Service key={ser.id_service}
                                // Passando as props do serviço
                                id_service={ser.id_service}
                                service={ser.description}

                                // Passando as props para os botões de ação, com funções de clique
                                clickEdit={() => clickEdit(ser.id_service, navigate)}
                                clickDelete={() => clickDelete(ser.id_service, confirmAlert, idService, setFiltroServices, navigate, setShowToast, setMessage, filterServices)}
                            />
                        ))
                    ) : 
                    
                    (
                        <tr>
                            <td colSpan="2" className='text-center'>
                                Nenhum serviço cadastrado
                            </td>
                        </tr>
                    )}
                    
                </tbody>

            </table>
        </div>

    </div>

}

// Exportando o componente de Services
export default Services;