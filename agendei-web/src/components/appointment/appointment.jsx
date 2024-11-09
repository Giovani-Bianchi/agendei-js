/*
    * Componente de Agendamento
    ----------------------------------------------------------------------------------------------------------
*/

function Appointment(props) {

    // Constante converter o que recebemos em date e passa para formatar no td. É necessário passar também a hora para não dar problema com fusos horários e ele confundir o dia
    const dt = new Date(props.booking_date + "T" + props.booking_hour);

    // Retornando a linha da tabela do agendamento com os dados dinâmicos
    return <tr>
        <td>{props.user}</td>
        <td>{props.doctor}</td>
        <td>{props.service}</td>
        <td>{new Intl.DateTimeFormat('pt-BR', {dateStyle: 'short'}).format(dt)} - {props.booking_hour}h</td>
        <td className="text-end">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(props.price)}</td>

        {/* Botões de Ação */}
        <td className="text-end">
            
            {/* Botão de Editar - No clique, através da função clickEdit vinda das props, irá editar o agendamento com base no id passado */}
            <div className="d-inline me-3" onClick={() => props.clickEdit(props.id_appointment)}>
                <button className="btn btn-sm btn-primary">
                    <i className="bi bi-pencil-square"></i>
                </button>
            </div>

            {/* Botão de Excluir - No clique, através da função clickDelete vinda das props, irá deletar o agendamento com base no id passado */}
            <button className="btn btn-sm btn-danger" onClick={() => props.clickDelete(props.id_appointment)}>
                <i className="bi bi-trash"></i>
            </button>

        </td>
    </tr>

}

// Exportando o componente de Appointment
export default Appointment;