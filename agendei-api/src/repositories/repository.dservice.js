/**
 * * Repository dos Serviços dos Médicos
 * ------------------------------------------------
 */

// Importando a função query do arquivo de configuração do SQLite
import { query } from "../database/sqlite.js";

// * --------------------------------------------MÉTODOS-------------------------------------------

/**
 * * Função de Listar Serviços Assíncrona
*/ 
async function Listar() {

    // Comando SQL para listar os serviços por sua descrição
    let sql = "select * from services order by description";

    // Constante de services que espera a resposta da query passando como primeiro parâmetro o comando e como segundo os parâmetros extras, que nesse caso é o filtro
    // Por ser uma Promise, temos que usar o await para esperar a consulta ser finalizada para assim então retornar os dados para a const services
    const services = await query(sql, []);

    // Retornando a lista de serviços
    return services;

}

/**
 * * Função de Listar Apenas os Serviços Não Vinculados ao Médico Assíncrona
*/ 
async function ListarDoctorServices(id_doctor, id_doctor_service) {

    // Comando SQL para listar apenas os serviços não vinculados ao médico
    let sql = `SELECT *
                FROM services s
                WHERE s.id_service NOT IN (
                    SELECT id_service
                    FROM doctors_services
                    WHERE id_doctor = ?
                )
                OR s.id_service = (
                    SELECT id_service
                    FROM doctors_services
                    WHERE id_doctor_service = ?
                );`;

    // Constante de services que espera a resposta da query passando como primeiro parâmetro o comando e como segundo os parâmetros extras, que nesse caso é o filtro
    // Por ser uma Promise, temos que usar o await para esperar a consulta ser finalizada para assim então retornar os dados para a const services
    const services = await query(sql, [id_doctor, id_doctor_service]);

    // Retornando a lista de serviços
    return services;

}

/**
 * * Função de Capturar os Dados Referente ao Serviço do Médico Assíncrona
*/ 
async function CapturarDoctorService(id_doctor, id_doctor_service) {

    // Comando SQL para capturar o serviço do médico
    let sql = "select * from doctors_services where id_doctor = ? and id_doctor_service = ?";

    // Constante de service que espera a resposta da query passando como primeiro parâmetro o comando e como segundo os parâmetros extras, que nesse caso é o filtro
    // Por ser uma Promise, temos que usar o await para esperar a consulta ser finalizada para assim então retornar os dados para a const services
    const service = await query(sql, [id_doctor, id_doctor_service]);

    // Retornando o serviço do médico
    return service[0];

}

/**
 * * Função de Exibir os Dados do Serviço Assíncrona
*/ 
async function ListarId(id_service) {

    // Comando SQL para capturar os dados do serviço
    // Lista pra mim todos os campos dessas tabela onde o id_service for igual ao parâmetro que será passado com base no botão de editar clicado da tabela
    let sql = "select * from services where id_service = ?";

    // Constante de dados do serviço que tem como parâmetro o id_service que preenche o ? na consulta SQL
    const service = await query(sql, [id_service]);

    // Retornando os dados do serviço, pegando só o primeiro item do array pois só existe um item, a serviço do id indicado pelo id_service
    return service[0];

}

/**
 * * Função de Filtrar Serviços Assíncrona
*/ 
async function Filtrar(id_service) {

    // Variável para o filtro
    let filtro = [];

    // Comando SQL para listar os serviços, se houver um id sendo recebido, adiciona o filtro
    let sql = "select * from services ";

    // Se existir o parâmetro id_service, adiciona o filtro
    if (id_service) {
        // Filtro a partir do id_service
        sql = sql + "where id_service = ? "

        // Insere o elemento no array
        filtro.push(id_service);
    }

    // Ordenando pela descrição
    sql = sql + "order by description";

    // Constante de services que espera a resposta da query passando como primeiro parâmetro o comando e como segundo os parâmetros extras, que nesse caso é o filtro
    // Por ser uma Promise, temos que usar o await para esperar a consulta ser finalizada para assim então retornar os dados para a const services
    const services = await query(sql, filtro);

    // Retornando a lista de serviços
    return services;

}

/**
 * * Função de Inserir Serviço Assíncrona
*/ 
async function Inserir(description) {

    // Comando SQL para inserção do serviço no BD com os parâmetros em ?, que será o campo description. Já retorna o id do serviço inserido
    let sql = "insert into services (description) values (?) returning id_service"

    // Constante de doctor com parâmetros extras que são os campos para inserção no BD que irão no lugar dos ? do comando SQL em ordem
    const service = await query(sql, [description]);

    // Retornando os dados inseridos do serviço, pegando apenas o primeiro dado do array (e único dado) que é o id do serviço (id_service). Assim, ele não retorna um array inteiro
    return service[0];

}

/**
 * * Função de Editar Serviço Assíncrona
*/ 
async function Editar(id_service, description) {

    // Comando SQL para editar um serviço no Banco de Dados com base no ID do serviço (id_service)
    let sql = `update services set 
                    description=? 
                where id_service = ?`

    // Query para edição no BD em que as variáveis irão no lugar dos ? do comando SQL em ordem
    await query(sql, [description, id_service]);

    // Retorna apenas o id_service, não é necessário retornar o resultado da query pois não há retorno. Não foi necessário colocar em uma constante pois não há retorno.
    return {id_service};

}

/**
 * * Função de Verificar Serviços Vinculados à Agendamentos Assíncrona
*/ 
async function VerificarServicos(id_service) {
    
    // Consulta para verificar se há algum agendamento com o id_service
    let sql = "SELECT COUNT(*) AS total FROM appointments WHERE id_service = ?";

    // Constante de resultado com o resultado da query
    const [result] = await query(sql, [id_service]);

    // Retorna verdadeiro se encontrar agendamentos, caso contrário falso
    return result.total > 0;

}

/**
 * * Função de Excluir Serviço Assíncrona
*/ 
async function Excluir(id_service) {

    // Comando SQL para excluir um serviço no Banco de Dados com base no ID do serviço (id_service)
    let sql = "delete from services where id_service = ?"

    // Query para exclusão no BD em que o id_service irá no lugar do ? do comando SQL
    await query(sql, [id_service]);

    // Retorna apenas o id_service para saber qual foi o serviço que foi excluído, não é necessário retornar o resultado da query pois não há retorno. Não foi necessário colocar em uma constante pois não há retorno.
    return {id_service};

}

// Exportando as funções do repository.dservice
export default { Listar, ListarDoctorServices, CapturarDoctorService, ListarId, Filtrar, Inserir, Editar, VerificarServicos, Excluir };