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
        sql = sql + "where id_service = ?"

        // Insere o elemento no array
        filtro.push(id_service);
    }

    // Constante de services que espera a resposta da query passando como primeiro parâmetro o comando e como segundo os parâmetros extras, que nesse caso é o filtro
    // Por ser uma Promise, temos que usar o await para esperar a consulta ser finalizada para assim então retornar os dados para a const services
    const services = await query(sql, filtro);

    // Retornando a lista de serviços
    return services;

}

// Exportando as funções do repository.dservice
export default { Listar, Filtrar }