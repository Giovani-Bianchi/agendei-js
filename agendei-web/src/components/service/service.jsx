/*
    * Componente de Serviço
    ----------------------------------------------------------------------------------------------------------
*/

function Service(props) {

    // Retornando a linha da tabela do serviço com os dados dinâmicos
    return <tr>
        <td>{props.service}</td>

        {/* Botões de Ação */}
        <td className="text-end">
            
            {/* Botão de Editar - No clique, através da função clickEdit vinda das props, irá editar o serviço com base no id passado */}
            <div className="d-inline me-3" onClick={() => props.clickEdit(props.id_service)}>
                <button className="btn btn-sm btn-primary">
                    <i className="bi bi-pencil-square"></i>
                </button>
            </div>

            {/* Botão de Excluir - No clique, através da função clickDelete vinda das props, irá deletar o serviço com base no id passado */}
            <button className="btn btn-sm btn-danger" onClick={() => props.clickDelete(props.id_service)}>
                <i className="bi bi-trash"></i>
            </button>

        </td>
    </tr>

}

// Exportando o componente de Serviço
export default Service;