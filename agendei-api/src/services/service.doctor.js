/**
 * * Service dos Médicos
 * ------------------------------------------------
 */

// Importação do Repository
import repoDoctor from "../repositories/repository.doctor.js";

// * --------------------------------------------MÉTODOS-------------------------------------------

/**
 * * Função de Listar Médicos Assíncrona
*/ 
async function Listar(name) {

    // Aguardando a função 'Listar' do repoDoctor
    const doctors = await repoDoctor.Listar(name);

    // Retornando a lista de médicos
    return doctors;

}

/**
 * * Função de Exibir os Dados do Médico Assíncrona
*/ 
async function ListarId(id_doctor) {

    // Aguardando a função 'ListarId' do repoDoctor
    const doctor = await repoDoctor.ListarId(id_doctor);

    // Retornando os dados do médico
    return doctor;

}

/**
 * * Função de Filtrar Médicos Assíncrona
*/ 
async function Filtrar(id_doctor) {

    // Aguardando a função 'Filtrar' do repoDoctor
    const doctors = await repoDoctor.Filtrar(id_doctor);

    // Retornando a lista de médicos
    return doctors;

}

/**
 * * Função de Inserir Médico Assíncrona
*/ 
async function Inserir(name, specialty, icon) {

    // Aguardando a função 'Inserir' do repoDoctor
    const doctor = await repoDoctor.Inserir(name, specialty, icon);

    // Retornando os dados inseridos do médico
    return doctor;

}

/**
 * * Função de Editar Médico Assíncrona
*/ 
async function Editar(id_doctor, name, specialty, icon) {

    // Aguardando a função 'Editar' do repoDoctor
    const doctor = await repoDoctor.Editar(id_doctor, name, specialty, icon);

    // Retornando os dados editados do médico
    return doctor;

}

/**
 * * Função de Excluir Médico Assíncrona
*/ 
async function Excluir(id_doctor) {

    // Verifica se o médico está vinculado a algum agendamento
    const possuiAgendamentos = await repoDoctor.VerificarAgendamentos(id_doctor);

    // Se possuir agendamentos com o médico cadastrado, não permite a exclusão, retornando null
    if (possuiAgendamentos) {
        return null;
    }

    // Aguardando a função 'Excluir' do repoDoctor
    const doctor = await repoDoctor.Excluir(id_doctor);

    // Retornando a exclusão do médico
    return doctor;

}

// Services

/**
 * * Função de Listar Serviços do Médico Assíncrona
*/ 
async function ListarServicos(id_doctor) {

    // Aguardando a função 'ListarServicos' do repoDoctor
    const serv = await repoDoctor.ListarServicos(id_doctor);

    // Retornando a lista de serviços do médico
    return serv;

}

/**
 * * Função de Inserir Serviço do Médico Assíncrona
*/ 
async function InserirServico(id_doctor, id_service, price) {

    // Aguardando a função 'InserirServicos' do repoDoctor
    const serv = await repoDoctor.InserirServico(id_doctor, id_service, price);

    // Retornando o serviço do médico
    return serv;

}

/**
 * * Função de Excluir Serviço do Médico Assíncrona
*/ 
async function ExcluirServico(id_doctor, id_service, id_doctor_service) {

    // Verifica se o serviço do médico está vinculado a algum agendamento
    const possuiAgendamentos = await repoDoctor.VerificarServicos(id_doctor, id_service);

    // Se possuir agendamentos com o serviço do médico cadastrado, não permite a exclusão, retornando null
    if (possuiAgendamentos) {
        return null;
    }

    // Aguardando a função 'ExcluirServico' do repoDoctor
    const serv = await repoDoctor.ExcluirServico(id_doctor, id_doctor_service);

    // Retornando a exclusão do serviço do médico
    return serv;

}

/**
 * * Função de Editar Serviço do Médico Assíncrona
*/ 
async function EditarServico(id_doctor, id_doctor_service, id_service, price) {

    // Aguardando a função 'EditarServico' do repoDoctor
    const serv = await repoDoctor.EditarServico(id_doctor, id_doctor_service, id_service, price);

    // Retornando a edição do serviço do médico
    return serv;

}

// * -----------------------------------------------------------------------------------------------

// Exportando as funções da service.doctor
export default { Listar, ListarId, Filtrar, Inserir, Editar, Excluir, ListarServicos, InserirServico, ExcluirServico, EditarServico };
