/*
    * Componente de Médico
    ----------------------------------------------------------------------------------------------------------
*/

function Doctor(props) {

    // Retornando a linha da tabela do médico com os dados dinâmicos
    return <tr>
        <td>{props.doctor}</td>
        <td>{props.specialty}</td>

        {/* Botões de Ação */}
        <td className="text-end">
            
            {/* Botão de Editar - No clique, através da função clickEdit vinda das props, irá editar o médico com base no id passado */}
            <div className="d-inline me-3" onClick={() => props.clickEdit(props.id_doctor)}>
                <button className="btn btn-sm btn-primary">
                    <i className="bi bi-pencil-square"></i>
                </button>
            </div>

            {/* Botão de Excluir - No clique, através da função clickDelete vinda das props, irá deletar o médico com base no id passado */}
            <button className="btn btn-sm btn-danger" onClick={() => props.clickDelete(props.id_doctor)}>
                <i className="bi bi-trash"></i>
            </button>

        </td>
    </tr>

}

// Exportando o componente de Doctor
export default Doctor;