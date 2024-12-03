/*
    * Componente de Serviço do Médico
    ----------------------------------------------------------------------------------------------------------
*/

function DoctorService(props) {

    // Retornando a linha da tabela dos serviços do médico com os dados dinâmicos
    return <tr>
        <td>{props.service}</td>
        <td>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(props.price)}</td>

        {/* Botões de Ação */}
        <td className="text-end">
            
            {/* Botão de Editar - No clique, através da função clickEdit vinda das props, irá editar o serviço do médico com base no id passado */}
            <div className="d-inline me-3" onClick={() => props.clickEdit(props.id_doctor_service)}>
                <button className="btn btn-sm btn-primary">
                    <i className="bi bi-pencil-square"></i>
                </button>
            </div>

            {/* Botão de Excluir - No clique, através da função clickDelete vinda das props, irá deletar o serviço do médico com base no id passado */}
            <button className="btn btn-sm btn-danger" onClick={() => props.clickDelete(props.id_doctor_service)}>
                <i className="bi bi-trash"></i>
            </button>

        </td>
    </tr>

}

// Exportando o componente de DoctorService
export default DoctorService;