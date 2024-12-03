/*
    * Tela de Adicionar/Editar Serviço do Médico
    ----------------------------------------------------------------------------------------------------------
*/

// Importações do react
import { useEffect, useState } from "react";

// Importações do React Router Dom
import { Link, useNavigate, useParams } from "react-router-dom";

// Importando as funções do Doctor Services Add
import { loadServices, saveDoctorService } from "./doctor-services-add.functions.js";

// Importando os componentes
import Navbar from "../../components/navbar/navbar.jsx";

function DoctorServicesAdd() {

    // Instanciando o navigate
    const navigate = useNavigate();

    // Constante de id do doctor, ao carregar essa tela, o useParams irá tentar pegar o id da URL
    const { id_doctor } = useParams();

    // Constante de id do doctor service, ao carregar essa tela, o useParams irá tentar pegar o id da URL, se ele conseguir, significa que é uma edição, senão, é uma criação
    const { id_doctor_service } = useParams();

    // Variável de estado de serviços para carregar os dados dos serviços
    const [services, setServices] = useState([]);

    // Variável de estado para armazenar o preço do serviço do médico
    const [idService, setIdService] = useState("");

    // Variável de estado para armazenar o preço do serviço do médico
    const [price, setPrice] = useState("");

    // Função para verificar se todos os campos estão preenchidos
    const isFormValid = idService !== "" && idService !== "0" && price !== "";

    // Carrega os dados do serviço do médico sempre que o componente for montado (caso seja passado um id)
    useEffect(() => {
        loadServices(setServices, navigate)
    }, []);

    return <>
    
        {/* Renderizando a Navbar */}
        <Navbar />

        {/* Form de Criação de Serviço do Médico */}
        <div className='container-fluid mt-page'>
            <div className="row col-lg-4 offset-lg-4">

                {/* Título de Novo Serviço do Médico */}
                <div className="col-12 mt-2">
                    {/* Se o id_doctor foi maior que 0, significa que é edição, então coloca o título "Editar Serviço Médico", senão, coloca "Novo Serviço Médico", que é criação */}
                    <h2>{id_doctor_service > 0 ? "Editar Serviço do Médico" : "Novo Serviço do Médico"}</h2>
                </div>

                {/* Select de serviço do médico */}
                <div className="col-12 mt-4">
                    <label htmlFor="service" className="form-label">Serviço</label>
                    <div className='form-control mb-2'>
                        <select name='service' id='service' value={idService} onChange={(e) => setIdService(e.target.value)}>
                            {/* Se a variável idService for vazia, mostra a opção de Selecione o serviço, senão, não mostra */}
                            {idService === "" && (
                                <option value="" disabled hidden>
                                    Selecione o Serviço
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

                {/* Input de preço do serviço do médico */}
                <div className="col-12 mt-3">
                    <label className="form-label">Preço do Serviço</label>
                    <div className="form-floating mb-3">
                        <input type="number" step="5" min="0" className="form-control" placeholder="Preço do Serviço" value={price} onChange={(e) => setPrice(e.target.value)} />
                        <label htmlFor="price">Preço do Serviço</label>
                    </div>
                </div>

                {/* Botões */}
                <div className="col-12 mt-4">
                    <div className="d-flex justify-content-end gap-2">
                        <Link to={`/doctors/${id_doctor}/services`} className="btn btn-outline-primary">Cancelar</Link>
                        <button type="button" className="btn btn-primary" disabled={!isFormValid} onClick={() => saveDoctorService(id_doctor_service, id_doctor, idService, price, navigate)}>Salvar Dados</button>
                    </div>
                </div>

            </div>
        </div>
    
    </>

}

// Exportando a função DoctorServicesAdd
export default DoctorServicesAdd;