/**
 * * Repository dos Usuários
 * ------------------------------------------------
 */

// Importando a função query do arquivo de configuração do SQLite
import { query } from "../database/sqlite.js"

// * --------------------------------------------MÉTODOS-------------------------------------------

/**
 * * Função de Inserir Usuário Assíncrona
*/ 
async function Inserir(name, email, password) {

    // Comando SQL para inserção do usuário no BD com os parâmetros em ?, que serão os campos name, email e password. Já retorna o id do usuário inserido
    let sql = "insert into users (name, email, password) values (?, ?, ?) returning id_user"

    // Constante de user com parâmetros extras que são os campos para inserção no BD que irão no lugar dos ? do comando SQL em ordem
    const user = await query(sql, [name, email, password]);

    // Retornando os dados inseridos do usuário, pegando apenas o primeiro dado do array (e único dado) que é o id do usuário (id_user). Assim, ele não retorna um array inteiro
    return user[0];

}

/**
 * * Função de ListarByEmail Assíncrona
*/ 
async function ListarByEmail(email) {

    // Comando SQL para verificar se o email do usuário existe no BD com os parâmetros em ?, que será o campo email
    let sql = "select * from users where email = ?"

    // Constante de user com parâmetros extras que são os campos para inserção no BD que irão no lugar dos ? do comando SQL em ordem
    const user = await query(sql, [email]);

    // Se o retorno do user for vazio, devolve um array vazio
    if (user.length == 0) {
        // Retornando um array vazio
        return [];
    }

    // Caso contrário, retorna o email encontrado no Banco de Dados
    else {
        // Retornando o email do usuário, pegando apenas o primeiro dado do array (e único dado) que é o email do usuário (email). Assim, ele não retorna um array inteiro
        return user[0];
    }

}

/**
 * * Função de Inserir Admin Assíncrona
*/ 
async function InserirAdmin(name, email, password) {

    // Comando SQL para inserção do usuário no BD com os parâmetros em ?, que serão os campos name, email e password. Já retorna o id do admin inserido
    let sql = "insert into admins (name, email, password) values (?, ?, ?) returning id_admin"

    // Constante de user com parâmetros extras que são os campos para inserção no BD que irão no lugar dos ? do comando SQL em ordem
    const user = await query(sql, [name, email, password]);

    // Retornando os dados inseridos do usuário, pegando apenas o primeiro dado do array (e único dado) que é o id do usuário (id_user). Assim, ele não retorna um array inteiro
    return user[0];

}

/**
 * * Função de ListarByEmailAdmin Assíncrona
*/ 
async function ListarByEmailAdmin(email) {

    // Comando SQL para verificar se o email do admin existe no BD com os parâmetros em ?, que será o campo email
    let sql = "select * from admins where email = ?"

    // Constante de user com parâmetros extras que são os campos para inserção no BD que irão no lugar dos ? do comando SQL em ordem
    const user = await query(sql, [email]);

    // Se o retorno do user for vazio, devolve um array vazio
    if (user.length == 0) {
        // Retornando um array vazio
        return [];
    }

    // Caso contrário, retorna o email encontrado no Banco de Dados
    else {
        // Retornando o email do usuário, pegando apenas o primeiro dado do array (e único dado) que é o email do usuário (email). Assim, ele não retorna um array inteiro
        return user[0];
    }

}

/**
 * * Função de Listar Campos do Usuário (Profile) Assíncrona
*/
async function Profile(id_user) {

    // Comando SQL para listar os campos do usuário (profile), ? representa um parâmetro da consulta
    let sql = "select id_user, name, email from users where id_user = ? ";

    // Constante de user com parâmetros extras que são os campos para consultar no BD que irão no lugar dos ?, nesse caso, apenas o id_user
    const user = await query(sql, [id_user]);

    // Retornando a lista de campos do usuário (profile), somente o primeiro elemento (pois retornará sempre apenas um usuário), para não retornar um array inteiro
    return user[0];

}

/**
 * * Função de Listar Usuários para o Admin Assíncrona
*/ 
async function Listar() {

    // Comando SQL para listar os usuários
    let sql = "select id_user, name, email from users order by name"

    // Constante de users 
    const users = await query(sql, []);

    // Retornando a lista de usuários
    return users;

}

// * -----------------------------------------------------------------------------------------------

// Exportando as funções do repository.user
export default { Inserir, ListarByEmail, InserirAdmin, ListarByEmailAdmin, Profile, Listar };