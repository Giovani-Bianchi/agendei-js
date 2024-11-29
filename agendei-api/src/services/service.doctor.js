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

// * -----------------------------------------------------------------------------------------------

// Exportando as funções da service.doctor
export default { Listar, Filtrar, Inserir, Editar, Excluir, ListarServicos };
