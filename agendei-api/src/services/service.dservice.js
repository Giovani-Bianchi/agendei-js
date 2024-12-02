/**
 * * Service dos Serviços dos Médicos
 * ------------------------------------------------
 */

// Importação do Repository
import repoDService from "../repositories/repository.dservice.js";

// * --------------------------------------------MÉTODOS-------------------------------------------

/**
 * * Função de Listar Serviços Assíncrona
*/ 
async function Listar() {

    // Aguardando a função 'Listar' do repoDService
    const services = await repoDService.Listar();

    // Retornando a lista de serviços
    return services;

}

/**
 * * Função de Exibir os Dados do Serviço Assíncrona
*/ 
async function ListarId(id_service) {

    // Aguardando a função 'ListarId' do repoDService
    const service = await repoDService.ListarId(id_service);

    // Retornando os dados do serviço
    return service;

}

/**
 * * Função de Filtrar Serviços Assíncrona
*/ 
async function Filtrar(id_service) {

    // Aguardando a função 'Filtrar' do repoDService
    const services = await repoDService.Filtrar(id_service);

    // Retornando a lista de serviços
    return services;

}

/**
 * * Função de Inserir Médico Assíncrona
*/ 
async function Inserir(description) {

    // Aguardando a função 'Inserir' do repoDService
    const service = await repoDService.Inserir(description);

    // Retornando os dados inseridos do serviço
    return service;

}

/**
 * * Função de Editar Serviço Assíncrona
*/ 
async function Editar(id_service, description) {

    // Aguardando a função 'Editar' do repoDService
    const service = await repoDService.Editar(id_service, description);

    // Retornando os dados editados do serviço
    return service;

}

/**
 * * Função de Excluir Serviço Assíncrona
*/ 
async function Excluir(id_service) {

    // Verifica se o serviço existe
    const possuiAgendamentos = await repoDService.VerificarServicos(id_service);

    // Se possuir agendamentos com o serviço cadastrado, não permite a exclusão, retornando null
    if (possuiAgendamentos) {
        return null;
    }

    // Aguardando a função 'Excluir' do repoDService
    const service = await repoDService.Excluir(id_service);

    // Retornando a exclusão do serviço
    return service;

}

// Exportando as funções do service.dservice
export default { Listar, ListarId, Filtrar, Inserir, Editar, Excluir };