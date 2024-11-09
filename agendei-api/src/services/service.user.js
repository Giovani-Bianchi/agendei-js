/**
 * * Service dos Usuários
 * ------------------------------------------------
 */

// Importação do bcrypt
import bcrypt from "bcrypt";

// Importação do Token JWT
import jwt from "../token.js";

// Importação do Repository
import repoUser from "../repositories/repository.user.js";

// * --------------------------------------------MÉTODOS-------------------------------------------

/**
 * * Função de Inserir Usuário Assíncrona
*/ 
async function Inserir(name, email, password) {

    // Constante de hash para a senha, utiliza-se o await pois é uma Promise, espera o hash ser feito para então receber e armazenar os dados. O primeiro parâmetro é a variável da senha e o segundo parâmetro são quantos rounds do hash o bcrypt irá fazer para a senha
    const hashPassword = await bcrypt.hash(password, 10);

    // Aguardando a função 'Inserir' do repoUser. É passado para frente a senha já criptografada para o repository poder salvar no banco de dados
    const user = await repoUser.Inserir(name, email, hashPassword);

    // Gera o token único após inserir o usuário, passando de parâmetro o id do usuário (id_user)
    user.token = jwt.CreateToken(user.id_user);

    // Retornando os dados da criação do usuário
    return user;

}

/**
 * * Função de Login Assíncrona
*/ 
async function Login(email, password) {

    // Aguardando a função 'ListarByEmail' do repoUser. Irá verificar se existe um usuário cadastrado com esse email
    const user = await repoUser.ListarByEmail(email);

    // Se o user for vazio, significa que não existe usuário com esse email, retorna assim um array vazio
    if (user.length == 0) {
        // Retorna um array vazio
        return []
    }

    // Caso contrário, irá verificar se a senha digitada é igual a senha criptografada do banco de dados utilizando o método compare do bcrypt
    else {
        // Se passou, significa que tanto o email quanto a senha estão corretas, retorna o usuário mas sem a senha, pois não é uma boa prática retornar a senha, mesmo estando criptografada
        if (await bcrypt.compare(password, user.password)) {
            // Exclui a senha do usuário para não ser enviado para o corpo  da requisição
            delete user.password;

            // Gera o token único do login, passando de parâmetro o id do usuário (id_user)
            user.token = jwt.CreateToken(user.id_user);
            
            // Retorna o user com os dados no corpo da requisição
            return user;
        }

        else {
            // Se não passou, significa que a senha está incorreta, retorna um array vazio
            return [];
        }
    }

}

/**
 * * Função de Inserir Admin Assíncrona
*/ 
async function InserirAdmin(name, email, password) {

    // Constante de hash para a senha, utiliza-se o await pois é uma Promise, espera o hash ser feito para então receber e armazenar os dados. O primeiro parâmetro é a variável da senha e o segundo parâmetro são quantos rounds do hash o bcrypt irá fazer para a senha
    const hashPassword = await bcrypt.hash(password, 10);

    // Aguardando a função 'Inserir' do repoUser. É passado para frente a senha já criptografada para o repository poder salvar no banco de dados
    const user = await repoUser.InserirAdmin(name, email, hashPassword);

    // Gera o token único após inserir o usuário, passando de parâmetro o id do usuário (id_user)
    user.token = jwt.CreateToken(user.id_user);

    // Retornando os dados da criação do usuário
    return user;

}

/**
 * * Função de Login Admin Assíncrona
*/ 
async function LoginAdmin(email, password) {

    // Aguardando a função 'ListarByEmail' do repoUser. Irá verificar se existe um usuário cadastrado com esse email
    const user = await repoUser.ListarByEmailAdmin(email);

    // Se o user for vazio, significa que não existe usuário com esse email, retorna assim um array vazio
    if (user.length == 0) {
        // Retorna um array vazio
        return []
    }

    // Caso contrário, irá verificar se a senha digitada é igual a senha criptografada do banco de dados utilizando o método compare do bcrypt
    else {
        // Se passou, significa que tanto o email quanto a senha estão corretas, retorna o usuário mas sem a senha, pois não é uma boa prática retornar a senha, mesmo estando criptografada
        if (await bcrypt.compare(password, user.password)) {
            // Exclui a senha do usuário para não ser enviado para o corpo  da requisição
            delete user.password;

            // Gera o token único do login, passando de parâmetro o id do usuário (id_user)
            user.token = jwt.CreateToken(user.id_user);
            
            // Retorna o user com os dados no corpo da requisição
            return user;
        }

        else {
            // Se não passou, significa que a senha está incorreta, retorna um array vazio
            return [];
        }
    }

}

/**
 * * Função de Listar Campos do Usuário (Profile) Assíncrona
*/ 
async function Profile(id_user) {

    // Aguardando a função 'Profile' do repoUser
    const user = await repoUser.Profile(id_user);

    // Retornando a lista de campos do usuário (profile)
    return user;

}

/**
 * * Função de Listar Usuários para o Admin Assíncrona
*/ 
async function Listar() {

    // Aguardando a função 'Listar' do repoUser
    const users = await repoUser.Listar();

    // Retornando a lista de usuários para o Admin
    return users;

}

// * -----------------------------------------------------------------------------------------------

// Exportando as funções da service.user
export default { Inserir, Login, InserirAdmin, LoginAdmin, Profile, Listar }