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
 * * Função de Filtrar Serviços Assíncrona
*/ 
async function Filtrar(id_service) {

    // Aguardando a função 'Filtrar' do repoDService
    const services = await repoDService.Filtrar(id_service);

    // Retornando a lista de médicos
    return services;

}

// Exportando as funções do service.dservice
export default { Listar, Filtrar };