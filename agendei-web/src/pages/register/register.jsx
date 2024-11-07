/*
    ? Tela de Registro
    ----------------------------------------------------------------------------------------------------------
*/

// Importando o CSS do Register
import './register.css';

// Importando as imagens
import logo from "../../assets/logo.png";
import fundo from "../../assets/fundo.png";

// Importações do react
import { useState } from 'react';

// Importando o componente Link do React Router Dom
import { Link, useNavigate } from 'react-router-dom';

// Importação da API
import api from '../../constants/api.js';

function Register() {

    // Variáveis de estado para armazenar os dados inseridos pelo usuário nos inputs de nome, email, senha e confirmação de senha
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    
    // Variável de estado para a mensagem de erro do Registro
    const [msg, setMsg] = useState("");

    // Instanciando o useNavigate
    const navigate = useNavigate();

    // Função Assíncrona para Executar o Registro
    async function ExecuteAccount() {

        // Zerando a mensagem de erro, assim quando o usuário clicar novamente no botão de Registro, já que a variável de mensagem foi zerada, o Alert irá sumir
        setMsg("");

        // Se as senhas forem diferentes uma da outra, entre a senha e a confirmação, exibe uma mensagem de erro e nem tenta executar a requisição
        if (password != password2) {
            return setMsg("As senhas não conferem. Digite novamente.");
        }

        // Tenta executar a requisição para a API
        try {

            // Criando a requisição de Register para a API usando o método POST
            const response = await api.post("/admin/register", {
                name,
                email,
                password
            });

            // Se no response existir o objeto 'data', significa que o registro foi bem sucedido, então guardamos os dados no LocalStorage e redirecionamos o usuário
            if (response.data) {
                // Incluíndo o item 'sessionToken' dentro do localStorage com o token recebido da API
                localStorage.setItem("sessionToken", response.data.token);

                // Incluíndo o item 'sessionId' dentro do localStorage com o id do admin recebido da API
                localStorage.setItem("sessionId", response.data.id_admin);

                // Incluíndo o item 'sessionEmail' dentro do localStorage com o email inserido no input
                localStorage.setItem("sessionEmail", email);

                // Incluíndo o item 'sessionName' dentro do localStorage com o nome inserido no input
                localStorage.setItem("sessionName", name);

                // Salvando o token vindo da API para um header Authorization com o nome de "Bearer" dentro do Axios, para que todas as requisições futuras tenham o token já inseridos dentro delas, sem a necessidade de enviar novamente o token em toda requisição mesmo já estando logado
                api.defaults.headers.common['Authorization'] = "Bearer " + response.data.token;

                // Irá redirecionar o usuário para a tela de Agendamentos
                navigate("/appointments")
            }

            // Caso contrário, se não existir o objeto 'data', significa que o registro falhou, então é passado uma mensagem genérica de erro
            else {
                // Passando a mensagem padrão para o setMsg
                setMsg("Erro ao criar conta. Tente novamente mais tarde.");
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
                setMsg("Erro ao criar conta. Tente novamente mais tarde.");
            }

        }

    }

    // Retornado o JSX da tela de Register
    return <div className='row'>

        {/* Seção de Registro */}
        <div className="col-sm-5 d-flex justify-content-center align-items-center text-center">

            <form action="" className='form-signin'>

                {/* Logo do Agendei com Texto Inicial */}
                <img src={logo} className='logo mb-4' alt="Logo do Agendei" />
                <h5 className='mb-5'>Crie sua conta agora mesmo.</h5>

                {/* Título de Acesse sua conta */}
                <h5 className='mb-4 text-secondary'>Preencha os campos abaixo</h5>

                {/* Input de Nome */}
                <div>
                    <input type="text" className='form-control' placeholder="Nome"
                    onChange={(e) =>{
                        // Capturando o nome inserido pelo usuário
                        setName(e.target.value);
                    }}/>
                </div>

                {/* Input de Email */}
                <div className='mt-2'>
                    <input type="email" className='form-control' placeholder="E-mail"
                    onChange={(e) =>{
                        // Capturando o email inserido pelo usuário
                        setEmail(e.target.value);
                    }}/>
                </div>

                {/* Input de Senha */}
                <div className='mt-2'>
                    <input type="password" className='form-control' placeholder="Senha"
                    onChange={(e) =>{
                        // Capturando a senha inserida pelo usuário
                        setPassword(e.target.value);
                    }}/>
                </div>

                {/* Input de Confirmar Senha */}
                <div className='mt-2'>
                    <input type="password" className='form-control' placeholder="Confirme a senha"
                    onChange={(e) =>{
                        // Capturando a confirmação da senha inserida pelo usuário
                        setPassword2(e.target.value);
                    }}/>
                </div>

                {/* Botão de Registrar-se */}
                <div className='mt-3'>
                    <button type="button" onClick={ExecuteAccount} className='btn btn-primary w-100'>Criar minha conta</button>
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

                {/* Link de Fazer Login */}
                <div className='mt-5'>
                    <span className='me-1'>Já tenho uma conta.</span>

                    {/* Componente de Link do React Router Dom - O to seria o href do Link */}
                    <Link to="/">Acessar agora.</Link>
                </div>

            </form>
        </div>

        {/* Seção da Imagem */}
        <div className="col-sm-7">
            <img src={fundo} className='background-login' alt="Fundo de Médico" />
        </div>

    </div>

}

// Exportando o componente de Register
export default Register;