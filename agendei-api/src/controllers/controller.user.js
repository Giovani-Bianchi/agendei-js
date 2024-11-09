/**
 * * Controller dos Usuários
 * ------------------------------------------------
 */

// Importação da Service
import serviceUser from "../services/service.user.js";

// * --------------------------------------------MÉTODOS-------------------------------------------

/**
 * * Função de Inserir Usuário Assíncrona
 */
async function Inserir(req, res) {

    // Constante para desconstruir o corpo da requisição com os dados de registro do usuário
    const { name, email, password } = req.body;

    // Aguardando a função 'Inserir' do serviceUser
    const user = await serviceUser.Inserir(name, email, password);

    // Retornando com resposta (response/res) com o status 201 (Created) e o usuário criado
    res.status(201).json(user);

}

/**
 * * Função de Login Assíncrona
 */
async function Login(req, res) {

    // Constante para desconstruir o corpo da requisição com os dados de login do usuário
    const { email, password } = req.body;

    // Aguardando a função 'Login' do serviceUser
    const user = await serviceUser.Login(email, password);

    // Se o retorno do user for vazio
    if (user.length == 0) {
        // Retorna com resposta (response/res) com o status 401 (Unauthorized) e mensagem de erro
        res.status(401).json({error: "Email ou senha inválida"});
    }
    
    // Se ele conseguiu acessar os dados do usuário, retorna os dados do usuário
    else {
        // Retornando com resposta (response/res) com o status 200 (OK) e o usuário logado
        res.status(200).json(user);
    }
    
}

/**
 * * Função de Inserir Admin Assíncrona
 */
async function InserirAdmin(req, res) {

    // Constante para desconstruir o corpo da requisição com os dados de registro do usuário
    const { name, email, password } = req.body;

    // Aguardando a função 'Inserir' do serviceUser
    const user = await serviceUser.InserirAdmin(name, email, password);

    // Retornando com resposta (response/res) com o status 201 (Created) e o usuário criado
    res.status(201).json(user);

}

/**
 * * Função de Login Admin Assíncrona
 */
async function LoginAdmin(req, res) {

    // Constante para desconstruir o corpo da requisição com os dados de login do usuário
    const { email, password } = req.body;

    // Aguardando a função 'Login' do serviceUser
    const user = await serviceUser.LoginAdmin(email, password);

    // Se o retorno do user for vazio
    if (user.length == 0) {
        // Retorna com resposta (response/res) com o status 401 (Unauthorized) e mensagem de erro
        res.status(401).json({error: "Email ou senha inválida"});
    }
    
    // Se ele conseguiu acessar os dados do usuário, retorna os dados do usuário
    else {
        // Retornando com resposta (response/res) com o status 200 (OK) e o usuário logado
        res.status(200).json(user);
    }
    
}

/**
 * * Função de Listar Campos do Usuário (Profile) Assíncrona
*/ 
async function Profile(req, res) {

    // Acessando o parâmetro de id do usuário pelo Token vindo da requisição
    const id_user = req.id_user;

    // Aguardando a função 'Profile' do serviceUser
    const user = await serviceUser.Profile(id_user);

    // Enviando a resposta para o cliente com o status 200 (OK) e o JSON contendo os dados
    res.status(200).json(user);

}

/**
 * * Função de Listar Usuários para o Admin Assíncrona
 */
async function Listar(req, res) {

    // Aguardando a função 'Login' do serviceUser
    const users = await serviceUser.Listar();

    // Enviando a resposta para o cliente com o status 200 (OK) e o JSON contendo os dados
    res.status(200).json(users);
    
}

// * -----------------------------------------------------------------------------------------------

// Exportando as funções do controller.user
export default { Inserir, Login, InserirAdmin, LoginAdmin, Profile, Listar };