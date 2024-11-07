/**
 * ? Service dos Usuários
 * ------------------------------------------------
 * * Quando a service recebe os dados do controller, antes de passar para o repository do user, é necessário fazer a tratativa da senha
 * * É necessário importar um pacote para trabalhar com o hash da senha, via node, instalando o pacote do bcrypt
 * 
 * * Para garantir mais segurança, é necessário a utilização de tokens, para quando o usuário se logar, ele receber um token, que será utilizado para realizar as requisições, assim se alguém sem o token acessar a URL dos médicos com o método GET esperando receber os médicos cadastrados no sistema, não irá receber os dados dos médicos, pois o token não foi passado. Isso é um jeito de proteger a API, para que apenas quem tem o token possa acessar os dados. Sem isso, a API fica vulnerável e qualquer um pode consumir os dados do nosso Banco.
 * * Token é uma string com letras e/ou números, e que contém algumas informações que você quer que seja contido ali dentro.
 * 
 * * Ao enviar os dados de login (email e senha) para a API, ele irá fazer as verificações de email e senha, e se tudo bater conforme o esperado, ele irá retornar o status code 200 (OK) e gerar um token, que será retornado para o usuário, que poderá utilizar para realizar as requisições.
 * 
 * * Para gerar o token, é necessário utilizar o pacote jsonwebtoken, que é um pacote que gera tokens, e que é utilizado para proteger a API.
 * * O Token JWT, como nome já diz, é um token que possui um JSON dentro dele.
 * * Dentro do Token irá conter o id do usuário (id_user).
 * * Dentro dos dados que vão ser retornados no corpo da requisição quando o usuário se logar, irá conter o id do usuário (id_user), nome (name) do usuário, o email (email) do usuário e o token gerado.
 * * Ao logar, o usuário será redirecionado para a página home listando os médicos cadastrados, que é uma rota protegida, logo irá precisar do token para a liberação na API, esse token será guardado ao logar.
 * * A cada Login que é feito, o token é alterado.
 * 
 * * A criação de conta também gera um token na API.
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
        // Se passou, signifca que tanto o email quanto a senha estão corretas, retorna o usuário mas sem a senha, pois não é uma boa prática retornar a senha, mesmo estando criptografada
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
        // Se passou, signifca que tanto o email quanto a senha estão corretas, retorna o usuário mas sem a senha, pois não é uma boa prática retornar a senha, mesmo estando criptografada
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