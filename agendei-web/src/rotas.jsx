/*
    * Arquivo de Rotas - Todo o mapeamento das páginas da nossa aplicação estará aqui
    ----------------------------------------------------------------------------------------------------------
*/

// Importações do react-router-dom
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Importando os componentes
import Login from "./pages/login/login.jsx";
import Register from "./pages/register/register.jsx";
import Appointments from "./pages/appointments/appointments.jsx";
import AppointmentAdd from "./pages/appointment-add/appointment-add.jsx";
import Doctors from "./pages/doctors/doctors.jsx";

function Rotas() {

    // Retornando o BrowserRouter
    return <BrowserRouter>
        <Routes>

            {/* ------------------------------------------------- Auth --------------------------------------------------- */}

            {/* Rota - Tela de Login */}
            <Route path="/" element={<Login />} />

            {/* Rota - Tela de Register */}
            <Route path="/register" element={<Register />} />

            {/* ---------------------------------------------- Appointments ---------------------------------------------- */}

            {/* Rota - Tela de Appointments */}
            <Route path="/appointments" element={<Appointments />} />

            {/* Rota - Tela de Adicionar Appointment */}
            <Route path="/appointments/add" element={<AppointmentAdd />} />

            {/* Rota - Tela de Editar Appointment */}
            <Route path="/appointments/edit/:id_appointment" element={<AppointmentAdd />} />

            {/* ------------------------------------------------- Doctors ------------------------------------------------- */}

            {/* Rota - Tela de Doctors */}
            <Route path="/doctors" element={<Doctors />} />

        </Routes>
    </BrowserRouter>

}

// Exportando o componente de Rotas
export default Rotas;