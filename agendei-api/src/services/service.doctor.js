/**
 * ? Service dos Médicos
 * ------------------------------------------------
 * * Na service não passamos os dados de requisição, não é o trabalho dela conhecer essa parte (req e res)
 * * A service recebe apenas os parâmetros que ela precisa para realizar a tarefa. Em uma função de Inserir por exemplo, os parâmetros seriam: name, specialty, etc.
 * * Assim, ela recebe o que precisa para funcionar por conta própria, independente de quem mandou essas informações, se veio de uma requisição, planilha, tanto faz
 * 
 * * O nome de disso é Injeção de Dependência - Tudo o que ela precisa para funcionar por conta própria
 * 
 * * Tornamos uma função assícrona e usamos o await quando a resposta pode demorar um tempo, como por exemplo demorar para fazer a conexão com o Banco de Dados, e então para não dar erro o assync irá esperar uma resposta para assim então fazer sua função. Só é possível usar o await em uma função assícrona
 * 
 * * É na service que criamos Regras de Negócio, como criptografia de senha validação de dados, etc.
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
export default { Listar, Inserir, Editar, Excluir, ListarServicos };
