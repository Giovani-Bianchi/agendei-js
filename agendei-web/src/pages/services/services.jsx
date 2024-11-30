/*
    * Tela de Services
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

// Importando os dados simulando a API
import { services } from '../../constants/data.js';

// Importando os Styled Components do Componente de Services
import { ThButtons } from '../services/services.styles.js';

// Importando os componentes
import Navbar from "../../components/navbar/navbar.jsx";
import Service from "../../components/service/service.jsx";

function Services() {

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
                    {/* Valor padrão do select é o valor do id_doctor, e toda vez que mudar o médico selecionado, o ChangeDoctor altera o id_doctor do value */}
                    <select name='service' id='service'>
                        <option value="">Todos os serviços</option>

                        {/* Opções do Select  */}
                    </select>
                </div>

                {/* Botão de Limpar */}
                <button type='button' className='btn btn-primary'>Limpar</button>

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
                    {
                        services.map((ser) => {
                            return <Service key={ser.id_service}
                                // Passando as props do serviço
                                id_service={ser.id_service}
                                service={ser.description}
                                
                                // Passando as props para os botões de ação, com funções de clique
                            />
                        })
                    }
                </tbody>

            </table>
        </div>

    </div>

}

// Exportando o componente de Services
export default Services;