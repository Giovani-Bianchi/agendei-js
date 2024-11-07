/**
 * ? Repository dos Médicos
 * ------------------------------------------------
 * * O repository é quem vai efetivamente acessar os dados do Banco de Dados
 * * Não tem acesso a requisição (req) ou a resposta (res), ele é completamente isolado e separado
 * * É ele que se preocupa em como é feito o acesso ao Banco de Dados, que tecnologia está usando, é o repository
 * * É aqui que seria a manutenção, pra trás dele (service, controller...) não muda nada
 * 
 * * Se eu quiser trabalhar com ORM, ferramentas que ajudam a criar e acessar o Banco de Dados, é no repository que é implementado
 * * Se eu quiser trabalhar com Query Builder, ferramentas que ajudam a escrever o comando SQL, é no repository que é implementado
 * * Se eu quiser trabalhar com comandos SQL nativos, é no repository que é implementado
 * 
 * * Ao guardar o comando SQL dentro de crases ao invés das aspas, é possível fazer quebra de linha
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
    let sql = `select d.id_service, s.description, d.price
                from doctors_services d
                join services s on (s.id_service = d.id_service)
                where d.id_doctor = ?
                order by s.description`;

    // Contante de serviço para listar os serviços prestados por determinado médico, com base no id_doctor que está substituindo o parâmetro ? na consulta SQL
    const serv = await query(sql, [id_doctor]);

    // Retornando a lista de serviços do médico
    return serv;

}

// * -----------------------------------------------------------------------------------------------

// Exportando as funções do repository.doctor
export default { Listar, Inserir, Editar, Excluir, ListarServicos }