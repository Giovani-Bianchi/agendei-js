/*
    * Componente de Navbar
    ----------------------------------------------------------------------------------------------------------
*/

// Importações do React Router Dom
import { Link, useLocation, useNavigate } from 'react-router-dom';

// Importando os Styled Components do Componente de Navbar
import { Logo } from './navbar.styles.js';

// Importações das Imagens
import logo from "../../assets/logo-white.png";

// Importação da API com Axios
import api from '../../constants/api.js';

function Navbar() {

    // Instanciando o navigate
    const navigate = useNavigate();
    
    // Instanciando o location
    const location = useLocation();

    // Função de Logout
    function Logout() {

        // Remover os localStorage Items
        localStorage.removeItem('sessionToken');
        localStorage.removeItem('sessionId');
        localStorage.removeItem('sessionEmail');
        localStorage.removeItem('sessionName');
        
        // Remover o cabeçalho contendo o Token
        api.defaults.headers.common['Authorization'] = "";

        // Redirecionando o usuário para o Login
        navigate('/');

    }

    return <nav className="navbar fixed-top navbar-expand-lg bg-primary" data-bs-theme="dark">
        <div className="container-fluid">

            {/* Logo do Agendei */}
            <Link className='navbar-brand' to="/appointments">
                <Logo src={logo} alt="Logo do Agendei" />
            </Link>

            {/* Botão da Navbar de Collapse */}
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            {/* Links da Navbar */}
            <div className="collapse navbar-collapse ms-5" id="navbarSupportedContent">
                
                {/* Lista de Links da Navbar */}
                <ul className="navbar-nav me-auto mb-2 mb-lg-0 gap-2">
                    {/* Link para a Pagina de Agendamentos */}
                    <li className="nav-item">
                        <Link className={`nav-link ${location.pathname === "/appointments" ? "active" : ""}`} to="/appointments">Agendamentos</Link>
                    </li>

                    {/* Link para a Pagina de Médicos */}
                    <li className="nav-item">
                        <Link className={`nav-link ${location.pathname === "/doctors" ? "active" : ""}`} to="/doctors">Médicos</Link>
                    </li>
                </ul>

                {/* Lista de Dropdown */}
                <ul className='navbar-nav'> 

                    {/* Dropdown */}
                    <li className='nav-item'>
                        <div className="dropdown">
                            {/* Botão do Dropdown */}
                            <button className="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                {/* Passando o nome do usuário para o botão do dropdown, pegando do localStorage */}
                                {localStorage.getItem("sessionName")}
                            </button>

                            {/* Itens do Dropdown Menu */}
                            <ul className="dropdown-menu dropdown-menu-end">
                                <li><Link className="dropdown-item" to="#">Meu Perfil</Link></li>
                                <li><hr className="dropdown-divider"/></li>
                                <li><button type='button' className="dropdown-item" onClick={Logout}>Desconectar</button></li>
                            </ul>
                        </div>
                    </li>

                </ul>

            </div>

        </div>
    </nav>
}

// Exportando o componente de Navbar
export default Navbar;