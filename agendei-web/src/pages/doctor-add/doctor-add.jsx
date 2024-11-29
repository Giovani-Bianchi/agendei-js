/*
    * Tela de Adicionar/Editar Médico
    ----------------------------------------------------------------------------------------------------------
*/

// Importações do react
import { useEffect, useState } from "react";

// Importações do React Router Dom
import { Link, useNavigate, useParams } from "react-router-dom";

// Importando as funções do Doctor Add
import { saveDoctor, loadDoctor } from "./doctor-add.functions.js";

// Importando os componentes
import Navbar from "../../components/navbar/navbar.jsx";

function DoctorAdd() {

    // Instanciando o navigate
    const navigate = useNavigate();

    // Constante de id do doctor, ao carregar essa tela, o useParams irá tentar pegar o id da URL, se ele conseguir, significa que é uma edição, senão, é uma criação
    const { id_doctor } = useParams();

    // Variável de estado para armazenar o nome do médico
    const [doctor, setDoctor] = useState("");

    // Variável de estado para armazenar o serviço prestado pelo médico
    const [service, setService] = useState("");

    // Variável de estado para armazenar o gênero do médio
    const [gender, setGender] = useState("");

    // Função para verificar se todos os campos estão preenchidos
    const isFormValid = doctor.trim() !== "" && service.trim() !== "" && gender !== "";

    // Carrega os dados do médico sempre que o componente for montado (caso seja passado um id)
    useEffect(() => {
        loadDoctor(id_doctor, setDoctor, setService, setGender, navigate)
    }, []);

    return <>
    
        {/* Renderizando a Navbar */}
        <Navbar />

        {/* Form de Criação de Médico */}
        <div className='container-fluid mt-page'>
            <div className="row col-lg-4 offset-lg-4">

                {/* Título de Nova Médico */}
                <div className="col-12 mt-2">
                    {/* Se o id_doctor foi maior que 0, significa que é edição, então coloca o título "Editar Médico", senão, coloca "Nova Médico", que é criação */}
                    <h2>{id_doctor > 0 ? "Editar Médico" : "Novo Médico"}</h2>
                </div>

                {/* Input de nome do médico */}
                <div className="col-12 mt-4">
                    <label className="form-label">Médico</label>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" placeholder="Nome do médico" value={doctor} onChange={(e) => setDoctor(e.target.value)} />
                        <label htmlFor="doctor">Nome do médico</label>
                    </div>
                </div>

                {/* Input de especialidade do médico */}
                <div className="col-12 mt-3">
                    <label className="form-label">Serviço</label>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" placeholder="Serviço do médico" value={service} onChange={(e) => setService(e.target.value)} />
                        <label htmlFor="service">Serviço do médico</label>
                    </div>
                </div>

                {/* Radios Buttons de gênero do médico */}
                <label className="form-label mt-3">Gênero</label>
                <div className="col-12 d-flex gap-3">

                    {/* Masculino */}
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="masculino" value="M" onChange={(e) => setGender(e.target.value)} checked={gender === "M"} />
                        <label className="form-check-label" htmlFor="masculino">
                            Masculino
                        </label>
                    </div>

                    {/* Feminino */}
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="feminino" value="F" onChange={(e) => setGender(e.target.value)} checked={gender === "F"} />
                        <label className="form-check-label" htmlFor="feminino">
                            Feminino
                        </label>
                    </div>

                </div>

                {/* Botões */}
                <div className="col-12 mt-4">
                    <div className="d-flex justify-content-end gap-2">
                        <Link to="/doctors" className="btn btn-outline-primary">Cancelar</Link>
                        <button type="button" className="btn btn-primary" disabled={!isFormValid} onClick={() => saveDoctor(id_doctor, doctor, service, gender, navigate)}>Salvar Dados</button>
                    </div>
                </div>

            </div>
        </div>
    
    </>

}

// Exportando a função DoctorAdd
export default DoctorAdd;