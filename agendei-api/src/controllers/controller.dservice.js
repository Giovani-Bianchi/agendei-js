/**
 * * Controller dos Serviços dos Médicos
 * ------------------------------------------------
 */

// Importação da Service
import serviceDService from "../services/service.dservice.js";

// * --------------------------------------------MÉTODOS-------------------------------------------

/**
 * * Função de Listar Serviços Assíncrona
*/ 
async function Listar(req, res) {

    // Aguardando a função 'Listar' do serviceDService
    const services = await serviceDService.Listar();

    // Enviando a resposta para o cliente com o status 200 (OK) e o JSON contendo os dados
    res.status(200).json(services);

}

/**
 * * Função de Filtrar Serviços Assíncrona
*/ 
async function Filtrar(req, res) {

    // Acessando o parâmetro de id do serviço
    const id_service = req.query.id_service;

    // Aguardando a função 'Filtrar' do serviceDService
    const services = await serviceDService.Filtrar(id_service);

    // Enviando a resposta para o cliente com o status 200 (OK) e o JSON contendo os dados
    res.status(200).json(services);

}

// Exportando as funções do controller.dservice
export default { Listar, Filtrar }