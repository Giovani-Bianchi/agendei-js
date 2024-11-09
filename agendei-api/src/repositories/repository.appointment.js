/**
 * * Repository das Reservas
 * ------------------------------------------------
 */

// Importando a função query do arquivo de configuração do SQLite
import { query } from "../database/sqlite.js"

// * --------------------------------------------MÉTODOS-------------------------------------------

/**
 * * Função de Listar Reservas do Usuário Assíncrona
*/ 
async function Listar(id_user, dt_start, dt_end, id_doctor) {

    // Variável de filtro
    let filtro = [];

    // Comando SQL para listar as reservas do usuário ordenando pela data e horário, ? representa um parâmetro da consulta
    // Lista pra mim todos os campos dessas tabela onde o id_appointment for > que 0 (sempre vai ser), mas o que importa é o que vai ser concatenado ao comando posteriormente
    let sql = `select a.id_appointment, s.description as service, d.name as doctor, d.specialty, a.booking_date, a.booking_hour, u.name as user, ds.price, a.id_doctor, 
    a.id_service, a.id_user
                from appointments a
                join services s on (s.id_service = a.id_service)
                join doctors d on (d.id_doctor = a.id_doctor)
                join users u on (u.id_user = a.id_user)
                join doctors_services ds on (ds.id_doctor = a.id_doctor and ds.id_service = a.id_service)
                where a.id_appointment > 0 `;

    // Se existe o id_user, listar todos os campos dessas tabela mas onde o id_user seja igual ao id_user passado pelo token no aplicativo
    if (id_user) {
        // Inserindo o id_user no array com o push()
        filtro.push(id_user)

        // Inserindo o id_user no comando SQL com o ? e concatenando o id_user ao comando SQL
        sql = sql + "and a.id_user = ? ";
    }

    // Se existe o dt_start, filtrar os agendamentos pela data inicial
    if (dt_start) {
        // Inserindo o dt_start no array com o push()
        filtro.push(dt_start)

        // Inserindo o dt_start no comando SQL com o ? e concatenando o dt_start ao comando SQL
        sql = sql + "and a.booking_date >= ? ";
    }

    // Se existe o dt_end, filtrar os agendamentos pela data final
    if (dt_end) {
        // Inserindo o dt_end no array com o push()
        filtro.push(dt_end)

        // Inserindo o dt_end no comando SQL com o ? e concatenando o dt_end ao comando SQL
        sql = sql + "and a.booking_date <= ? ";
    }

    // Se existe o id_doctor, filtrar os agendamentos pelo médico
    if (id_doctor) {
        // Inserindo o id_doctor no array com o push()
        filtro.push(id_doctor)

        // Inserindo o id_doctor no comando SQL com o ? e concatenando o id_doctor ao comando SQL
        sql = sql + "and a.id_doctor = ? ";
    }

    // Ordenando no final de tudo por data e horário
    sql = sql + "order by a.booking_date, a.booking_hour";

    // Constante de reservas do usuário que tem como parâmetro o id_user que preenche o ? na consulta SQL
    const appointments = await query(sql, filtro);

    // Retornando a lista de reservas do usuário
    return appointments;

}

/**
 * * Função de Exibir os Dados da Reserva para o Admin Assíncrona
*/ 
async function ListarId(id_appointment) {

    // Comando SQL para capturar os dados da reserva
    // Lista pra mim todos os campos dessas tabela onde o id_appointment for igual ao parâmetro que será passado com base no botão de editar clicado da tabela
    let sql = `select a.id_appointment, s.description as service, d.name as doctor, d.specialty, a.booking_date, a.booking_hour, u.name as user, ds.price, a.id_doctor, 
    a.id_service, a.id_user
                from appointments a
                join services s on (s.id_service = a.id_service)
                join doctors d on (d.id_doctor = a.id_doctor)
                join users u on (u.id_user = a.id_user)
                join doctors_services ds on (ds.id_doctor = a.id_doctor and ds.id_service = a.id_service)
                where a.id_appointment = ? `;

    // Constante de dados da reserva que tem como parâmetro o id_appointment que preenche o ? na consulta SQL
    const appointments = await query(sql, [id_appointment]);

    // Retornando os dados da reserva, pegando só o primeiro item do array pois só existe um item, a reserva do id indicado pelo id_appointment
    return appointments[0];

}

/**
 * * Função de Inserir Reserva Assíncrona
*/ 
async function Inserir(id_user, id_doctor, id_service, booking_date, booking_hour) {

    // Comando SQL para inserção da reserva no BD com os parâmetros em ?, que serão os campos id_user, id_doctor, id_service, booking_date, booking_hour. Já retorna o id da reserva feita
    let sql = "insert into appointments (id_user, id_doctor, id_service, booking_date, booking_hour) values (?, ?, ?, ?, ?) returning id_appointment"

    // Constante de reserva com parâmetros extras que são os campos para inserção no BD que irão no lugar dos ? do comando SQL em ordem
    const appointment = await query(sql, [id_user, id_doctor, id_service, booking_date, booking_hour]);

    // Retornando os dados inseridos da reserva, pegando apenas o primeiro dado do array (e único dado) que é o id da reserva (id_appointment). Assim, ele não retorna um array inteiro
    return appointment[0];

}

/**
 * * Função de Editar Reserva Assíncrona
*/ 
async function Editar(id_appointment, id_user, id_doctor, id_service, booking_date, booking_hour) {

    // Comando SQL para edição da reserva no BD com os parâmetros em ?, que serão os campos id_user, id_doctor, id_service, booking_date, booking_hour e id_appointment
    let sql = "update appointments set id_user = ?, id_doctor = ?, id_service = ?, booking_date = ?, booking_hour = ? where id_appointment = ?"

    // Query com parâmetros extras que são os campos para edição no BD que irão no lugar dos ? do comando SQL em ordem
    await query(sql, [id_user, id_doctor, id_service, booking_date, booking_hour, id_appointment]);

    // Retornando o id do appointment alterado
    return { id_appointment };

}

/**
 * * Função de Excluir Reserva Assíncrona
*/ 
async function Excluir(id_user, id_appointment) {

    // Comando SQL para exclusão da reserva no BD com os parâmetros em ?, que será o campo id_appointment
    let sql = "delete from appointments where id_appointment = ?"

    // Query com parâmetros extras que são os campos para exclusão no BD que irão no lugar dos ? do comando SQL em ordem
    await query(sql, [id_appointment]);

    // Retornando os dados excluídos da reserva, fazendo isso pelo retorno do id_appointment
    return { id_appointment };

}

// * -----------------------------------------------------------------------------------------------

// Exportando as funções do repository.appointment
export default { Listar, ListarId, Inserir, Editar, Excluir }