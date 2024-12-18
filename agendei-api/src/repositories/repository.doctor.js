/**
 * * Repository dos Médicos
 * ------------------------------------------------
 */

// Importando a função query do arquivo de configuração do SQLite
import { query } from "../database/sqlite.js"

// * --------------------------------------------MÉTODOS-------------------------------------------

/**
 * * Função de Listar Médicos Assíncrona
*/ 
async function Listar(name) {

    // Variável para o filtro
    let filtro = [];

    // Comando SQL para listar os médicos por nome, ? representa um parâmetro da consulta
    let sql = "select * from doctors ";

    // Se existir o parâmetro name, adiciona o filtro
    if(name) {
        // Filtro a partir do nome
        sql = sql + "where name like ? "

        // Insere o elemento no array
        filtro.push('%' + name + '%');
    }

    // Ordenar por nome
    sql = sql + "order by name";

    // Constante de doctors que espera a resposta da query passando como primeiro parâmetro o comando e como segundo os parâmetros extras, que nesse caso é o filtro
    // Por ser uma Promise, temos que usar o await para esperar a consulta ser finalizada para assim então retornar os dados para a const doctors
    const doctors = await query(sql, filtro);

    // Retornando a lista de médicos
    return doctors;

}

/**
 * * Função de Exibir os Dados do Médico Assíncrona
*/ 
async function ListarId(id_doctor) {

    // Comando SQL para capturar os dados do médico
    // Lista pra mim todos os campos dessas tabela onde o id_doctor for igual ao parâmetro que será passado com base no botão de editar clicado da tabela
    let sql = "select * from doctors where id_doctor = ?";

    // Constante de dados do médico que tem como parâmetro o id_doctor que preenche o ? na consulta SQL
    const doctor = await query(sql, [id_doctor]);

    // Retornando os dados do médico, pegando só o primeiro item do array pois só existe um item, a médico do id indicado pelo id_doctor
    return doctor[0];

}

/**
 * * Função de Filtrar Médicos Assíncrona
*/ 
async function Filtrar(id_doctor) {

    // Variável para o filtro
    let filtro = [];

    // Comando SQL para listar os médicos, se houver um id sendo recebido, adiciona o filtro
    let sql = "select * from doctors ";

    // Se existir o parâmetro id_doctor, adiciona o filtro
    if (id_doctor) {
        // Filtro a partir do id_doctor
        sql = sql + "where id_doctor = ?"

        // Insere o elemento no array
        filtro.push(id_doctor);
    }

    // Ordenar por nome
    sql = sql + "order by name";

    // Constante de doctors que espera a resposta da query passando como primeiro parâmetro o comando e como segundo os parâmetros extras, que nesse caso é o filtro
    // Por ser uma Promise, temos que usar o await para esperar a consulta ser finalizada para assim então retornar os dados para a const doctors
    const doctors = await query(sql, filtro);

    // Retornando a lista de médicos
    return doctors;

}

/**
 * * Função de Inserir Médico Assíncrona
*/ 
async function Inserir(name, specialty, icon) {

    // Comando SQL para inserção do médico no BD com os parâmetros em ?, que serão os campos name, specialty e icon. Já retorna o id do médico inserido
    let sql = "insert into doctors (name, specialty, icon) values (?, ?, ?) returning id_doctor"

    // Constante de doctor com parâmetros extras que são os campos para inserção no BD que irão no lugar dos ? do comando SQL em ordem
    const doctor = await query(sql, [name, specialty, icon]);

    // Retornando os dados inseridos do médico, pegando apenas o primeiro dado do array (e único dado) que é o id do médico (id_doctor). Assim, ele não retorna um array inteiro
    return doctor[0];

}

/**
 * * Função de Editar Médico Assíncrona
*/ 
async function Editar(id_doctor, name, specialty, icon) {

    // Comando SQL para editar um médico no Banco de Dados com base no ID do médico (id_doctor)
    let sql = `update doctors set 
                    name=?, 
                    specialty=?, 
                    icon=?
                where id_doctor = ?`

    // Query para edição no BD em que as variáveis irão no lugar dos ? do comando SQL em ordem
    await query(sql, [name, specialty, icon, id_doctor]);

    // Retorna apenas o id_doctor, não é necessário retornar o resultado da query pois não há retorno. Não foi necessário colocar em uma constante pois não há retorno.
    return {id_doctor};

}

/**
 * * Função de Verificar Médicos Vinculados à Agendamentos Assíncrona
*/ 
async function VerificarAgendamentos(id_doctor) {
    
    // Consulta para verificar se há algum agendamento com o id_doctor
    let sql = "SELECT COUNT(*) AS total FROM appointments WHERE id_doctor = ?";

    // Constante de resultado com o resultado da query
    const [result] = await query(sql, [id_doctor]);

    // Retorna verdadeiro se encontrar agendamentos, caso contrário falso
    return result.total > 0;

}

/**
 * * Função de Excluir Médico Assíncrona
*/ 
async function Excluir(id_doctor) {

    // Comando SQL para excluir um médico no Banco de Dados com base no ID do médico (id_doctor)
    let sql = "delete from doctors where id_doctor = ?"

    // Query para exclusão no BD em que o id_doctor irá no lugar do ? do comando SQL
    await query(sql, [id_doctor]);

    // Retorna apenas o id_doctor para saber qual foi o médico que foi excluído, não é necessário retornar o resultado da query pois não há retorno. Não foi necessário colocar em uma constante pois não há retorno.
    return {id_doctor};

}

// Services

/**
 * * Função de Listar Serviços do Médico Assíncrona
*/ 
async function ListarServicos(id_doctor) {

    // Comando SQL para listar os serviços do médico por nome, ? representa um parâmetro da consulta. Irá listar o id do serviço, a descrição do serviço e o preço do serviço ordenados pela descrição, utilizando o join para poder pegar os dados da tabela de serviços. Foi usado o alias para nomear as tabelas com 'd' e 's'.
    let sql = `select d.id_doctor_service, d.id_doctor, d.id_service, doc.name, s.description, d.price
                from doctors_services d
                join doctors doc on (d.id_doctor = doc.id_doctor)
                join services s on (s.id_service = d.id_service)
                where d.id_doctor = ?
                order by s.description`;

    // Contante de serviço para listar os serviços prestados por determinado médico, com base no id_doctor que está substituindo o parâmetro ? na consulta SQL
    const serv = await query(sql, id_doctor);

    // Retornando a lista de serviços do médico
    return serv;

}

/**
 * * Função de Inserir Serviço do Médico Assíncrona
*/ 
async function InserirServico(id_doctor, id_service, price) {

    // Comando SQL para inserir um serviço relacionado a determinado médico
    let sql = `insert into doctors_services (id_doctor, id_service, price) values (?, ?, ?)`;

    // Contante de serviço para inserir o serviço prestado por determinado médico
    const serv = await query(sql, [id_doctor, id_service, price]);

    // Retornando o serviço do médico
    return serv;

}

/**
 * * Função de Verificar os Serviços do Médico Vinculados à Agendamentos Assíncrona
*/ 
async function VerificarServicos(id_doctor, id_service) {
    
    // Consulta para verificar se há algum agendamento com o id_doctor e o id_service passado
    let sql = "SELECT COUNT(*) AS total FROM appointments WHERE id_doctor = ? AND id_service = ?";

    // Constante de resultado com o resultado da query
    const [result] = await query(sql, [id_doctor, id_service]);

    // Retorna verdadeiro se encontrar agendamentos, caso contrário falso
    return result.total > 0;

}

/**
 * * Função de Excluir Serviço do Médico Assíncrona
*/ 
async function ExcluirServico(id_doctor, id_doctor_service) {

    // Comando SQL para excluir um serviço do médico no Banco de Dados com base no ID do médico (id_doctor) e no id do serviço do médico (id_doctor_service)
    let sql = "delete from doctors_services where id_doctor = ? and id_doctor_service = ?";

    // Query para exclusão no BD em que o id_doctor e o id_doctor_service irão no lugar dos ? do comando SQL, respectivamente
    await query(sql, [id_doctor, id_doctor_service]);

    // Retorna apenas o id_doctor_service para saber qual foi o serviço do médico que foi excluído, não é necessário retornar o resultado da query pois não há retorno. Não foi necessário colocar em uma constante pois não há retorno.
    return {id_doctor_service};

}

/**
 * * Função de Editar Serviço do Médico Assíncrona
*/ 
async function EditarServico(id_doctor, id_doctor_service, id_service, price) {

    // Comando SQL para editar um serviço do médico no Banco de Dados com base no ID do médico (id_doctor) e no id do serviço do médico (id_doctor_service)
    let sql = `update doctors_services set 
                    id_service = ?, 
                    price = ?
                where id_doctor = ? and id_doctor_service = ?`;

    // Query para edição no BD em que o id_doctor, id_doctor_service, id_service e price irão no lugar dos ? do comando SQL, respectivamente
    await query(sql, [id_service, price, id_doctor, id_doctor_service]);

    // Retorna apenas o id_doctor_service para saber qual foi o serviço do médico que foi editado, não é necessário retornar o resultado da query pois não há retorno. Não foi necessário colocar em uma constante pois não há retorno.
    return {id_doctor_service};

}

// * -----------------------------------------------------------------------------------------------

// Exportando as funções do repository.doctor
export default { Listar, ListarId, Filtrar, Inserir, Editar, VerificarAgendamentos, Excluir, ListarServicos, InserirServico, VerificarServicos, ExcluirServico, EditarServico };