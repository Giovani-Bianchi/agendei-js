/**
 * ? Arquivo de Token
 * ------------------------------------------------
 * * Irá criar os tokens e validar os tokens
 * * Quando receber uma requisição e o token estiver lá, será possível saber o id_user pelo token, já que é uma das informações que ele irá conter
 * 
 * * Quando receber uma requisição, irá passar pela validação do token e se for validado irá passar para o controller fazer o que foi pedido
 */

// Importação do jsonwebtoken
import jwt from 'jsonwebtoken';

// Constante para a chave secreta, que será usada na hora de criar um token e na hora de receber uma requisição para decodificar e verificar para ver se houve alguma alteração no meio do caminho
const secretToken = "jornadaJS123";

function CreateToken(id_user) {

    // Constante do token para assinar ele, passando o id do usuário e a chave secreta. Como último parâmetro, parâmetros opcionais, como por exemplo o  tempo de expiração desse token
    const token = jwt.sign({id_user}, secretToken, {
        // Atribuindo um valor bem alto de expiração para esse token não expirar
        expiresIn: 9999999
    });

    // Retorno do token
    return token;

}

function ValidateToken(req, res, next) {

    // Constante de authToken para capturar o token que estará contido no cabeçalho da requisição, num cabeçalho chamado authorization
    const authToken = req.headers.authorization; // "Bearer 0000000000"

    // Se não for possível ler o token, retorna um erro de token não informado
    if (!authToken) {
        return res.status(401).json({error: "Token não informado"});
    }

    // Desprezando o texto 'Bearer' e o espaço  em branco, para pegar apenas o token. Irá pegar o token e irá 'cortar' quando encontrar um espaço em branco, e irá guardar o 'Bearer' dentro da variável bearer e o token dentro da variável token
    const [bearer, token] = authToken.split(" ") // "Bearer " "0000000000"

    // Fazendo a verificação do token, ou irá retornar um erro (err) ou irá retornar o token já decodificado (tokenDecoded)
    jwt.verify(token, secretToken, (err, tokenDecoded) => {

        if (err) {
            // Se encontrar um erro, irá retornar um erro de token inválido
            return res.status(401).json({error: "Token inválido"});
        }

        // Insere o id do usuário que está vindo do token já na requisição
        req.id_user = tokenDecoded.id_user;

        // Se deu tudo certo, o token é válido, irá prosseguir
        next();

    });

}

// Exportando as funções do token de criar e validar o token
export default { CreateToken, ValidateToken };