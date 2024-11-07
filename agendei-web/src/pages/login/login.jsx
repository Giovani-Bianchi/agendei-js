/*
    ? Tela de Login
    ----------------------------------------------------------------------------------------------------------
    * Para fazer o POST para rota de user/login, será necessário capturar os dados dos inputs e montar a requisição para nossa API executar o login, iremos guardar no LocalStorage para numa próxima vez que o usuário abrir o site, ele permanecer logado

    * onChange - Sempre que o usuário digitar algo no input, será chamada a função que irá capturar os dados e montar a requisição para a API. O 'e' passado como parâmetro da função dentro do onChange é o evento que foi disparado, que contém informações sobre o elemento que disparou o evento, nesse caso, o input

    * Função Assíncrona - Faz o POST para a API e espera a resposta para poder guardar os dados na variável, e executa o restando do código enquanto espera por essa ação, então por ser assícrona ela espera uma resposta para poder agir. O método POST devolve uma Promise, que é uma promessa de que em algum momento os dados serão retornados para gente, e o await é usado para esperar a Promise ser resolvida, ou seja, para esperar a resposta da API. É necessário o uso do await quando se está trabalhando com Promises

    * Iremos armazenar as informações do usuário no LocalStorage, para que quando o usuário abrir o site novamente, ele  permaneça logado, e não precise digitar novamente os dados para acessar o site. O Token que será o responsável por ser armazenado como chave para o usuário, inclusive por conta das rotas privadas. Não é recomendado salvar dados sigilosos dentro do Local Storage, pois ele é armazenado no navegador do usuário, e qualquer pessoa que tenha acesso ao navegador do usuário, terá acesso aos dados armazenados no Local Storage.
*/

// Importando o CSS do Login
import './login.css';

// Importando as imagens
import logo from "../../assets/logo.png";
import fundo from "../../assets/fundo.png";

// Importações do react
import { useState } from 'react';

// Importações do React Router Dom - O useNavigate é usado para navegar para outra página via código
import { Link, useNavigate } from 'react-router-dom';

// Importação da API com o Axios
import api from "../../constants/api.js";

function Login() {

    // Variáveis de estado para armazenar os dados inseridos pelo usuário nos inputs de email e senha
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    // Variável de estado para a mensagem de erro do Login
    const [msg, setMsg] = useState("");

    // Instanciando o useNavigate
    const navigate = useNavigate();

    // Função Assíncrona para Executar o Login - Faz o POST para a API e espera a resposta para poder guardar os dados na variável, e executa o restando do código enquanto espera por essa ação, então por ser assícrona ela espera uma resposta para poder agir. O método POST devolve uma Promise, que é uma promessa de que em algum momento os dados serão retornados para gente, e o await é usado para esperar a Promise ser resolvida, ou seja, para esperar a resposta da API. É necessário o uso do await quando se está trabalhando com Promises
    async function ExecuteLogin() {

        // Zerando a mensagem de erro, assim quando o usuário clicar novamente no botão de Login, já que a variável de mensagem foi zerada, o Alert irá sumir
        setMsg("");

        // Tenta executar a requisição para a API
        try {

            // Criando a requisição de Login para a API usando o método POST
            const response = await api.post("/admin/login", {
                // Aqui, como segundo parâmetro, abrimos as chaves e colocamos os dados que serão enviados para a API. Pelo nome das variáveis serem o mesmo da API, não precisamos fazer algo como "email: email", pois o React entende que o valor de email é o que deve ser, assim também para o password
                email,
                password
            });

            // Se no response existir o objeto 'data', significa que o login foi bem sucedido, então guardamos os dados no LocalStorage e redirecionamos o usuário
            if (response.data) {
                // Incluíndo o item 'sessionToken' dentro do localStorage com o token recebido da API
                localStorage.setItem("sessionToken", response.data.token);

                // Incluíndo o item 'sessionId' dentro do localStorage com o id do admin recebido da API
                localStorage.setItem("sessionId", response.data.id_admin);

                // Incluíndo o item 'sessionEmail' dentro do localStorage com o email recebido da API
                localStorage.setItem("sessionEmail", response.data.email);

                // Incluíndo o item 'sessionName' dentro do localStorage com o nome recebido da API
                localStorage.setItem("sessionName", response.data.name);

                // Salvando o token vindo da API para um header Authorization com o nome de "Bearer" dentro do Axios, para que todas as requisições futuras tenham o token já inseridos dentro delas, sem a necessidade de enviar novamente o token em toda requisição mesmo já estando logado
                api.defaults.headers.common['Authorization'] = "Bearer " + response.data.token;

                // Irá redirecionar o usuário para a tela de Agendamentos
                navigate("/appointments")
            }

            // Caso contrário, se não existir o objeto 'data', significa que o login falhou, então é passado uma mensagem genérica de erro
            else {
                // Passando a mensagem padrão para o setMsg
                setMsg("Erro ao efetuar login. Tente novamente mais tarde.");
            }

        }
        
        // Se não conseguir, trata o erro que ocorreu, aqui é para erros que vieram do servidor (API)
        catch (error) {

            // Se dentro do error, conseguiu obter o response e dentro do response existe a propriedade data e dentro da data há qual é o erro (? significa que pode não existir)
            if (error.response?.data.error) {
                // Inserindo a mensagem de erro na função de setMsg para ela jogar na variável msg, que é usada para exibir a mensagem de erro no Alert
                setMsg(error.response?.data.error);
            }

            // Se não conseguiu obter qual é o erro vindo do servidor, então exibe a mensagem de erro padrão
            else {
                // Passando a mensagem padrão para o setMsg
                setMsg("Erro ao efetuar login. Tente novamente mais tarde.");
            }

        }

    }

    // Função para capturar o aperto do enter e acionar o botão de login
    function EnterPress(e) {
        // Se o enter for pressionado, executa a função de ExecuteLogin
        if (e.key === 'Enter') {
            ExecuteLogin();
        }
    }

    // Retornado o JSX da tela de Login
    return <div className='row'>

        {/* Seção de Login */}
        <div className="col-sm-5 d-flex justify-content-center align-items-center text-center">

            <form action="" className='form-signin'>

                {/* Logo do Agendei com Texto Inicial */}
                <img src={logo} className='logo mb-4' alt="Logo do Agendei" />
                <h5 className='mb-5'>Gerencie seus agendamentos de forma descomplicada.</h5>

                {/* Título de Acesse sua conta */}
                <h5 className='mb-4 text-secondary'>Acesse sua conta</h5>

                {/* Input de Email */}
                <div>
                    <input type="email" className='form-control' placeholder="E-mail" 
                    onChange={(e) => {
                        // Capturando o valor do input / e.target = Quem disparou o evento / value = O valor do input
                        setEmail(e.target.value)
                    }}/>
                </div>

                {/* Input de Senha */}
                <div className='mt-2'>
                    <input type="password" className='form-control' placeholder="Senha" 
                    onChange={(e) => {
                        // Capturando o valor do input / e.target = Quem disparou o evento / value = O valor do input
                        setPassword(e.target.value)
                    }}
                    // Função para capturar o aperto do enter e acionar o botão de login
                    onKeyDown={EnterPress}
                    />
                </div>

                {/* Botão de Login */}
                <div className='mt-3'>
                    <button type="button" onClick={ExecuteLogin} className='btn btn-primary w-100'>Login</button>
                </div>

                {/* Só irá exibir o alert caso ocorra um erro, ou seja, caso a variável 'msg' tenha algum conteúdo dentro dela */}
                {
                    // Se a mensagem de erro for maior que 0 no seu tamanho, ENTÃO (&&) irá exibir o alert, nesse caso não preciso do : para indicar o else por conta do &&
                    msg.length > 0 &&

                    // Alert de Erro
                    <div className="alert alert-danger mt-3" role="alert">
                        {msg}
                    </div>
                }

                {/* Link de Criar Conta */}
                <div className='mt-5'>
                    <span className='me-1'>Não tenho uma conta.</span>

                    {/* Componente de Link do React Router Dom - O to seria o href do Link */}
                    <Link to="/register">Criar conta agora.</Link>
                </div>

            </form>
        </div>

        {/* Seção da Imagem */}
        <div className="col-sm-7">
            <img src={fundo} className='background-login' alt="Fundo de Médico" />
        </div>

    </div>

}

// Exportando o componente de Login
export default Login;