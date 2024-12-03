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
 * * Função de Listar Apenas os Serviços Não Vinculados ao Médico Assíncrona
*/ 
async function ListarDoctorServices(req, res) {
    
    // Acessando o parâmetro id_doctor pelos parâmetros da requisição
    const id_doctor = req.params.id_doctor;

    // Aguardando a função 'ListarDoctorServices' do serviceDService
    const services = await serviceDService.ListarDoctorServices(id_doctor);

    // Enviando a resposta para o cliente com o status 200 (OK) e o JSON contendo os dados
    res.status(200).json(services);

}

/**
 * * Função de Exibir os Dados do Serviço Assíncrona
*/ 
async function ListarId(req, res) {

    // Acessando o parâmetro id_service pelos parâmetros da requisição, vindo do Token
    const id_service = req.params.id_service;

    // Aguardando a função 'ListarId' do serviceDService
    const service = await serviceDService.ListarId(id_service);

    // Enviando a resposta para o cliente com o status 200 (OK) e o JSON contendo os dados
    res.status(200).json(service);

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

/**
 * * Função de Inserir Serviços Assíncrona
 */
async function Inserir(req, res) {

    // Acessando os dados do corpo da requisição e desestruturando eles para cada variável
    const { description } = req.body;

    // Aguardando a função 'Inserir' do serviceDService
    const service = await serviceDService.Inserir(description);

    // Enviando a resposta para o cliente com o status 201 (Created) e o JSON contendo os dados que foram inseridos do serviço
    res.status(201).json(service);

}

/**
 * * Função de Editar Serviço Assíncrona
 */
async function Editar(req, res) {

    // Extraindo o id_service da requisição pelo params, para saber qual serviço deve-se editar
    const id_service = req.params.id_service;

    // Constante para desestruturar os dados vindos do corpo da requisição, os novos dados nos quais serão usados para editar o serviço
    const {description} = req.body;

    // Aguardando a função 'Editar' do serviceDService
    const service = await serviceDService.Editar(id_service, description);

    // Enviando a resposta para o cliente com o status 200 (OK) e o JSON contendo os dados que foram editados do serviço
    res.status(200).json(service);

}

/**
 * * Função de Excluir Serviço Assíncrona
 */
async function Excluir(req, res) {

    // Extraindo o id_service da requisição pelo params, para saber qual serviço deve-se excluir
    const id_service = req.params.id_service;

    // Aguardando a função 'Excluir' do serviceDService
    const service = await serviceDService.Excluir(id_service);

    // Enviando a resposta para o cliente com o status 200 (OK), foi excluído com sucesso
    res.status(200).json(service);

}

// Exportando as funções do controller.dservice
export default { Listar, ListarDoctorServices, ListarId, Filtrar, Inserir, Editar, Excluir };