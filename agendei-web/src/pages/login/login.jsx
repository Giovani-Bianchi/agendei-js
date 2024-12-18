/*
    * Tela de Login
    ----------------------------------------------------------------------------------------------------------
*/

// Importações do react
import { useState } from 'react';

// Importações do React Router Dom - O useNavigate é usado para navegar para outra página via código
import { Link, useNavigate } from 'react-router-dom';

// Importando as funções do Login
import { executeLogin, enterPress } from './login.functions.js';

// Importando os Styled Components do Componente de Login
import { Form, Logo, DoctorImage } from './login.styles.js';

// Importando as imagens
import logo from "../../assets/logo.png";
import fundo from "../../assets/fundo.png";

// Importação do useAuth do AuthContext
import { useAuth } from "../../contexts/authContext.jsx";

function Login() {

    // Constante de login do useAuth para armazenar os dados do usuário no localStorage
    const { login } = useAuth();

    // Variáveis de estado para armazenar os dados inseridos pelo usuário nos inputs de email e senha
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    // Variável de estado para a mensagem de erro do Login
    const [msg, setMsg] = useState("");

    // Instanciando o useNavigate
    const navigate = useNavigate();

    // Retornado o JSX da tela de Login
    return <div className='row'>

        {/* Seção de Login */}
        <div className="col-sm-5 d-flex justify-content-center align-items-center text-center">

            <Form action="">

                {/* Logo do Agendei com Texto Inicial */}
                <Logo src={logo} alt="Logo do Agendei" />
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
                    onKeyDown={(e) => enterPress(e, () => executeLogin(email, password, setMsg, navigate))}
                    />
                </div>

                {/* Botão de Login */}
                <div className='mt-3'>
                    <button type="button" onClick={() => executeLogin(email, password, setMsg, navigate, login)} className='btn btn-primary w-100'>Login</button>
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

            </Form>
        </div>

        {/* Seção da Imagem */}
        <div className="col-sm-7">
            <DoctorImage src={fundo} alt="Fundo de Médico" />
        </div>

    </div>

}

// Exportando o componente de Login
export default Login;