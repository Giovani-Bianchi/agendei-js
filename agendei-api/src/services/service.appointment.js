/**
 * * Service das Reservas
 * ------------------------------------------------
 */

// Importação do Repository
import repoAppointment from "../repositories/repository.appointment.js";

// * --------------------------------------------MÉTODOS-------------------------------------------

/**
 * * Função de Listar Reservas do Usuário e Admin Assíncrona
*/ 
async function Listar(id_user, dt_start, dt_end, id_doctor) {

    // Aguardando a função 'Listar' do repoAppointment
    const appointments = await repoAppointment.Listar(id_user, dt_start, dt_end, id_doctor);

    // Retornando as reservas do usuário
    return appointments;

}

/**
 * * Função de Exibir os Dados da Reserva para o Admin Assíncrona
*/ 
async function ListarId(id_appointment) {

    // Aguardando a função 'ListarId' do repoAppointment
    const appointments = await repoAppointment.ListarId(id_appointment);

    // Retornando os dados da reserva
    return appointments;

}

/**
 * * Função de Inserir Reserva Assíncrona
*/ 
async function Inserir(id_user, id_doctor, id_service, booking_date, booking_hour) {

    // Aguardando a função 'Inserir' do repoAppointment
    const appointment = await repoAppointment.Inserir(id_user, id_doctor, id_service, booking_date, booking_hour);

    // Retornando os dados inseridos da reserva
    return appointment;

}

/**
 * * Função de Editar Reserva Assíncrona
*/ 
async function Editar(id_appointment, id_user, id_doctor, id_service, booking_date, booking_hour) {

    // Aguardando a função 'Editar' do repoAppointment
    const appointment = await repoAppointment.Editar(id_appointment, id_user, id_doctor, id_service, booking_date, booking_hour);

    // Retornando os dados editados da reserva
    return appointment;

}

/**
 * * Função de Excluir Reserva Assíncrona
*/ 
async function Excluir(id_user, id_appointment) {

    // Aguardando a função 'Excluir' do repoAppointment
    const appointment = await repoAppointment.Excluir(id_user, id_appointment);

    // Retornando os dados excluídos da reserva
    return appointment;

}

// * -----------------------------------------------------------------------------------------------

// Exportando as funções da service.appointment
export default { Listar, ListarId, Inserir, Editar, Excluir };