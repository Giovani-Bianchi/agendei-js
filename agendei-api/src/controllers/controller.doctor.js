/**
 * * Controller dos Médicos
 * ------------------------------------------------
 */

// Importação da Service
import serviceDoctor from "../services/service.doctor.js";

// * --------------------------------------------MÉTODOS-------------------------------------------

/**
 * * Função de Listar Médicos Assíncrona
*/ 
async function Listar(req, res) {

    // Acessando o parâmetro name da requisição pela query
    const name = req.query.name;

    // Aguardando a função 'Listar' do serviceDoctor
    const doctors = await serviceDoctor.Listar(name);

    // Enviando a resposta para o cliente com o status 200 (OK) e o JSON contendo os dados
    res.status(200).json(doctors);

}

/**
 * * Função de Exibir os Dados do Médico Assíncrona
*/ 
async function ListarId(req, res) {

    // Acessando o parâmetro id_doctor pelos parâmetros da requisição, vindo do Token
    const id_doctor = req.params.id_doctor;

    // Aguardando a função 'ListarId' do serviceDoctor
    const doctor = await serviceDoctor.ListarId(id_doctor);

    // Enviando a resposta para o cliente com o status 200 (OK) e o JSON contendo os dados
    res.status(200).json(doctor);

}

/**
 * * Função de Filtrar Médicos Assíncrona
*/ 
async function Filtrar(req, res) {

    // Acessando o parâmetro de id do médico
    const id_doctor = req.query.id_doctor;

    // Aguardando a função 'Filtrar' do serviceDoctor
    const doctors = await serviceDoctor.Filtrar(id_doctor);

    // Enviando a resposta para o cliente com o status 200 (OK) e o JSON contendo os dados
    res.status(200).json(doctors);

}

/**
 * * Função de Inserir Médicos Assíncrona
 */
async function Inserir(req, res) {

    /* Acessando os dados do corpo da requisição
    const name = req.body.name;
    const specialty = req.body.specialty;
    const icon = req.body.icon; */

    // É a mesma coisa do método de cima, porém mais encurtado, pois o req.body já está acessando os dados do corpo da requisição e desestruturando eles para cada variável
    const { name, specialty, icon } = req.body;

    // Aguardando a função 'Inserir' do serviceDoctor
    const doctor = await serviceDoctor.Inserir(name, specialty, icon);

    // Enviando a resposta para o cliente com o status 201 (Created) e o JSON contendo os dados que foram inseridos do médico
    res.status(201).json(doctor);

}

/**
 * * Função de Editar Médico Assíncrona
 */
async function Editar(req, res) {

    // Extraindo o id_doctor da requisição pelo params, para saber qual médico deve-se editar
    const id_doctor = req.params.id_doctor;

    // Constante para desestruturar os dados vindos do corpo da requisição, os novos dados nos quais serão usados para editar o médico
    const {name, specialty, icon} = req.body;

    // Aguardando a função 'Editar' do serviceDoctor
    const doctor = await serviceDoctor.Editar(id_doctor, name, specialty, icon);

    // Enviando a resposta para o cliente com o status 200 (OK) e o JSON contendo os dados que foram editados do médico
    res.status(200).json(doctor);

}

/**
 * * Função de Excluir Médico Assíncrona
 */
async function Excluir(req, res) {

    // Extraindo o id_doctor da requisição pelo params, para saber qual médico deve-se excluir
    const id_doctor = req.params.id_doctor;

    // Aguardando a função 'Excluir' do serviceDoctor
    const doctor = await serviceDoctor.Excluir(id_doctor);

    // Enviando a resposta para o cliente com o status 200 (OK), foi excluído com sucesso
    res.status(200).json(doctor);

}

// Services

/**
 * * Função de Listar Serviços do Médico Assíncrona
 */
async function ListarServicos(req, res) {

    // Acessando o parâmetro id_doctor pelo params da requisição
    const id_doctor = req.params.id_doctor;

    // Aguardando a função 'ListarServicos' do serviceDoctor
    const serv = await serviceDoctor.ListarServicos(id_doctor);

    // Enviando a resposta para o cliente com o status 200 (OK) e o JSON contendo os dados
    res.status(200).json(serv);

}

/**
 * * Função de Inserir Serviço do Médico Assíncrona
 */
async function InserirServico(req, res) {

    // Acessando os dados do corpo da requisição e desestruturando eles para cada variável
    const { id_doctor, id_service, price } = req.body;

    // Aguardando a função 'InserirServico' do serviceDoctor
    const serv = await serviceDoctor.InserirServico(id_doctor, id_service, price);

    // Enviando a resposta para o cliente com o status 200 (OK) e o JSON contendo os dados
    res.status(200).json(serv);

}

// * -----------------------------------------------------------------------------------------------

// Exportando as funções do controller.doctor
export default { Listar, ListarId, Filtrar, Inserir, Editar, Excluir, ListarServicos, InserirServico };