/*
    * Tela de Doctors
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

// Importando as funções de Doctors
import { clickEdit, clickDelete, loadDoctors, filterDoctors, changeDoctor, clearInput } from './doctors.functions.js';

// Importando os Styled Components do Componente de Doctors
import { ThButtons } from './doctors.styles.js';

// Importando os componentes
import Navbar from "../../components/navbar/navbar.jsx";
import Doctor from '../../components/doctor/doctor.jsx';

function Doctors() {

    // Instanciando o navigate
    const navigate = useNavigate();

    // Variável de estado para listar os médicos cadastrados no BD vindos da API
    const [doctors, setDoctors] = useState([]);

    // Variável de estado para filtrar os médicos cadastrados no BD vindos da API
    const [filtroDoctors, setFiltroDoctors] = useState([]);
    
    // Variável de estado para armazenar o id do médico selecionado, começa com o valor de nulo sendo uma string
    const [idDoctor, setIdDoctor] = useState("");

    // Lista todos os doctors e os doctors filtrados quando o idDoctor é alterado
    useEffect(() => {
        loadDoctors(setDoctors, navigate);
        filterDoctors(idDoctor, setFiltroDoctors, navigate);
    }, [idDoctor])

    return <div className='container-fluid mt-page p-4'>
    
        {/* Componente de Navbar */}
        <Navbar />

        {/* Seção de Filtros */}
        <div className="d-flex justify-content-between align-itens-center">

            {/* Título com Botão de Novo Médico */}
            <div className='mb-4'>
                <h2 className='d-inline'>Médicos</h2>
                <Link to="/doctors/add" className='btn btn-outline-primary ms-4 mb-2'>Novo Médico</Link>
            </div>

            {/* Filtros dos Médicos e Botão Filtrar */}
            <div className='d-flex align-items-center mb-4'>

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

                {/* Botão de Limpar */}
                <button type='button' className='btn btn-primary' onClick={() => clearInput(setIdDoctor)}>Limpar</button>

            </div>

        </div>

        {/* Tabela de Médicos CRUD */}
        <div>
            <table className='table table-hover'>  

                {/* Cabeçalho da Tabela */}
                <thead>
                    <tr>
                        <th scope='col'>Médico</th>
                        <ThButtons scope='col'></ThButtons>
                    </tr>
                </thead>

                {/* Corpo da Tabela - Loop carregando várias vezes o componente */}
                <tbody>
                    {
                        filtroDoctors.map((doc) => {
                            return <Doctor key={doc.id_doctor}
                                // Passando as props do doctor
                                id_doctor={doc.id_doctor}
                                doctor={doc.name}

                                // Passando as props para os botões de ação, com funções de clique
                                clickEdit={() => clickEdit(doc.id_doctor, navigate)}
                                clickDelete={() => clickDelete(doc.id_doctor, confirmAlert, navigate)}
                            />
                        })
                    }
                </tbody>

            </table>
        </div>
    
    </div>

}

// Exportando o componente de Doctors
export default Doctors;