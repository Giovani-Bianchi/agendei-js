/*
    * Tela de Registro
    ----------------------------------------------------------------------------------------------------------
*/

// Importações do react
import { useState } from 'react';

// Importando o componente Link do React Router Dom
import { Link, useNavigate } from 'react-router-dom';

// Importando as funções do Register
import { executeAccount } from './register.functions.js';

// Importando os Styled Components do Componente de Register
import { Form, Logo, DoctorImage } from './register.styles.js';

// Importando as imagens
import logo from "../../assets/logo.png";
import fundo from "../../assets/fundo.png";

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

    // Retornado o JSX da tela de Register
    return <div className='row'>

        {/* Seção de Registro */}
        <div className="col-sm-5 d-flex justify-content-center align-items-center text-center">

            <Form action="">

                {/* Logo do Agendei com Texto Inicial */}
                <Logo src={logo} alt="Logo do Agendei" />
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
                    <button type="button" onClick={() => executeAccount(name, email, password, password2, setMsg, navigate)} className='btn btn-primary w-100'>Criar minha conta</button>
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
                    <Link to="/login">Acessar agora.</Link>
                </div>

            </Form>
        </div>

        {/* Seção da Imagem */}
        <div className="col-sm-7">
            <DoctorImage src={fundo} alt="Fundo de Médico" />
        </div>

    </div>

}

// Exportando o componente de Register
export default Register;