/**
 * ? Controller das Reservas
 * ------------------------------------------------
 * * A função de Listar e ListarByUser chamam a mesma função na service do appointment, mas passam diferentes parâmetros, para que a mesma função possa ser utilizada em diferentes contextos. É passado 0 para o id_user na função de Listar (admin) e passado os 3 parâmetros que só serve pro Admin na função de ListarByUser (usuário) vazios
 */

// Importação da Service
import serviceAppointment from "../services/service.appointment.js";

// * --------------------------------------------MÉTODOS-------------------------------------------

/**
 * * Função de Listar Reservas para o Admin Assícrona
*/ 
async function Listar(req, res) {

    // Acessando o parâmetro de data inicial do agendamento
    const dt_start = req.query.dt_start;
    
    // Acessando o parâmetro de data final do agendamento
    const dt_end = req.query.dt_end;

    // Acessando o parâmetro de id do médico
    const id_doctor = req.query.id_doctor;

    // Aguardando a função 'Listar' do serviceAppointment
    const appointments = await serviceAppointment.Listar(0, dt_start, dt_end, id_doctor);

    // Enviando a resposta para o cliente com o status 200 (OK) e o JSON contendo os dados
    res.status(200).json(appointments);

}

/**
 * * Função de Listar Reservas por Usuário Assícrona
*/ 
async function ListarByUser(req, res) {

    // Acessando o parâmetro id_user pela requisição, vindo do Token
    const id_user = req.id_user;

    // Aguardando a função 'Listar' do serviceAppointment
    const appointments = await serviceAppointment.Listar(id_user, "", "", "");

    // Enviando a resposta para o cliente com o status 200 (OK) e o JSON contendo os dados
    res.status(200).json(appointments);

}

/**
 * * Função de Exibir os Dados da Reserva para o Admin Assíncrona
*/ 
async function ListarId(req, res) {

    // Acessando o parâmetro id_appointment pelos parâmetros da requisição, vindo do Token
    const id_appointment = req.params.id_appointment;

    // Aguardando a função 'ListarId' do serviceAppointment
    const appointments = await serviceAppointment.ListarId(id_appointment);

    // Enviando a resposta para o cliente com o status 200 (OK) e o JSON contendo os dados
    res.status(200).json(appointments);

}

/**
 * * Função de Inserir Reservas Assícrona
 */
async function Inserir(req, res) {

    // Acessando o parâmetro id_user pela requisição, vindo do Token
    const id_user = req.id_user;

    // Constante para armazenar o que está vindo do req.body, que já está acessando os dados do corpo da requisição e desestruturando eles para cada variável
    const { id_doctor, id_service, booking_date, booking_hour } = req.body;

    // Aguardando a função 'Inserir' do serviceAppointment
    const appointment = await serviceAppointment.Inserir(id_user, id_doctor, id_service, booking_date, booking_hour);

    // Enviando a resposta para o cliente com o status 201 (Created) e o JSON contendo os dados que foram inseridos da reserva
    res.status(201).json(appointment);

}

/**
 * * Função de Inserir Reservas do Admin Assícrona
 */
async function InserirAdmin(req, res) {

    // Constante para armazenar o que está vindo do req.body, que já está acessando os dados do corpo da requisição e desestruturando eles para cada variável
    const { id_user, id_doctor, id_service, booking_date, booking_hour } = req.body;

    // Aguardando a função 'Inserir' do serviceAppointment
    const appointment = await serviceAppointment.Inserir(id_user, id_doctor, id_service, booking_date, booking_hour);

    // Enviando a resposta para o cliente com o status 201 (Created) e o JSON contendo os dados que foram inseridos da reserva
    res.status(201).json(appointment);

}

/**
 * * Função de Editar Reservas do Admin Assícrona
 */
async function EditarAdmin(req, res) {

    // Captura o id_appointment vindo nos parâmetros da URL
    const id_appointment = req.params.id_appointment;

    // Constante para armazenar o que está vindo do req.body, que já está acessando os dados do corpo da requisição e desestruturando eles para cada variável
    const { id_user, id_doctor, id_service, booking_date, booking_hour } = req.body;

    // Aguardando a função 'Editar' do serviceAppointment
    const appointment = await serviceAppointment.Editar(id_appointment, id_user, id_doctor, id_service, booking_date, booking_hour);

    // Enviando a resposta para o cliente com o status 200 (Ok) e o JSON contendo os dados que foram editados da reserva
    res.status(200).json(appointment);

}

/**
 * * Função de Excluir Reservas Assícrona
 */
async function Excluir(req, res) {

    // Acessando o parâmetro id_user pela requisição, vindo do Token
    const id_user = req.id_user;

    // Acessando o parâmetro id_appointment pelo params vindo da requisição
    const id_appointment = req.params.id_appointment;

    // Aguardando a função 'Excluir' do serviceAppointment
    const appointment = await serviceAppointment.Excluir(id_user, id_appointment);

    // Enviando a resposta para o cliente com o status 200 (OK) e o JSON contendo os dados que foram exluídos da reserva
    res.status(200).json(appointment);

}

// Exportando as funções do controller.appointment
export default { Listar, ListarByUser, ListarId, Inserir, InserirAdmin, EditarAdmin, Excluir };