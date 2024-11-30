/*
    * Tela de Adicionar/Editar Serviço
    ----------------------------------------------------------------------------------------------------------
*/

// Importações do react
import { useEffect, useState } from "react";

// Importações do React Router Dom
import { Link, useNavigate, useParams } from "react-router-dom";

// Importando as funções do Service Add
import { saveService, loadService } from "./service-add.functions.js";

// Importando os componentes
import Navbar from "../../components/navbar/navbar.jsx";

function ServiceAdd() {

    // Instanciando o navigate
    const navigate = useNavigate();

    // Constante de id do service, ao carregar essa tela, o useParams irá tentar pegar o id da URL, se ele conseguir, significa que é uma edição, senão, é uma criação
    const { id_service } = useParams();

    // Variável de estado para armazenar o nome do serviço
    const [service, setService] = useState("");

    // Função para verificar se todos os campos estão preenchidos
    const isFormValid = service.trim() !== "";

    // Carrega os dados do serviço sempre que o componente for montado (caso seja passado um id)
    useEffect(() => {
        loadService(id_service, setService, navigate);
    }, []);

    return <>
    
        {/* Renderizando a Navbar */}
        <Navbar />

        {/* Form de Criação de Serviço */}
        <div className='container-fluid mt-page'>
            <div className="row col-lg-4 offset-lg-4">

                {/* Título de Novo Serviço */}
                <div className="col-12 mt-2">
                    {/* Se o id_service foi maior que 0, significa que é edição, então coloca o título "Editar Serviço", senão, coloca "Nova Serviço", que é criação */}
                    <h2>{id_service > 0 ? "Editar Serviço" : "Novo Serviço"}</h2>
                </div>

                {/* Input de nome do serviço */}
                <div className="col-12 mt-4">
                    <label className="form-label">Serviço</label>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" placeholder="Nome do serviço" value={service} onChange={(e) => setService(e.target.value)} />
                        <label htmlFor="service">Nome do serviço</label>
                    </div>
                </div>

                {/* Botões */}
                <div className="col-12 mt-4">
                    <div className="d-flex justify-content-end gap-2">
                        <Link to="/services" className="btn btn-outline-primary">Cancelar</Link>
                        <button type="button" className="btn btn-primary" disabled={!isFormValid} onClick={() => saveService(id_service, service, navigate)}>Salvar Dados</button>
                    </div>
                </div>

            </div>
        </div>
    
    </>

}

// Exportando a função ServiceAdd
export default ServiceAdd;