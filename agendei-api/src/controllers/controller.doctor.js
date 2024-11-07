/**
 * ? Controller dos Médicos
 * ------------------------------------------------
 */

// Importação da Service
import serviceDoctor from "../services/service.doctor.js";

// * --------------------------------------------MÉTODOS-------------------------------------------

/**
 * * Função de Listar Médicos Assícrona - Recebe os dados da req (requisição) e da res (resposta)
 * Ao chegar para a API a rota 'doctors', será executado o código dentro do callback da função de Listar do controllerDoctor, conforme o arquivo de rotas
 * O callback recebe o parâmetro 'req' que é a requisição e o  parâmetro 'res' que é a resposta 
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
 * * Função de Inserir Médicos Assícrona
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
 * * Função de Editar Médico Assícrona
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
 * * Função de Excluir Médico Assícrona
 */
async function Excluir(req, res) {

    // Extraindo o id_doctor da requisição pelo params, para saber qual médico deve-se excluir
    const id_doctor = req.params.id_doctor;

    // Aguardando a função 'Excluir' do serviceDoctor
    const doctor = await serviceDoctor.Excluir(id_doctor);

    // Enviando a resposta para o cliente com o status 200 (OK), foi excluido com sucesso
    res.status(200).json(doctor);

}

// Services

/**
 * * Função de Listar Serviços do Médico Assícrona
 */
async function ListarServicos(req, res) {

    // Acessando o parâmetro id_doctor pelo params da requisição
    const id_doctor = req.params.id_doctor;

    // Aguardando a função 'ListarServicos' do serviceDoctor
    const serv = await serviceDoctor.ListarServicos(id_doctor);

    // Enviando a resposta para o cliente com o status 200 (OK) e o JSON contendo os dados
    res.status(200).json(serv);

}

// * -----------------------------------------------------------------------------------------------

// Exportando as funções do controller.doctor
export default { Listar, Inserir, Editar, Excluir, ListarServicos };