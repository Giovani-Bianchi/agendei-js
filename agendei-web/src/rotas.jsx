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
import DoctorAdd from "./pages/doctor-add/doctor-add.jsx";
import Services from "./pages/services/services.jsx";
import ServiceAdd from "./pages/service-add/service-add.jsx";
import DoctorServices from "./pages/doctor-services/doctor-services.jsx";
import DoctorServicesAdd from "./pages/doctor-services-add/doctor-services-add.jsx";

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

            {/* Rota - Tela de Adicionar Doctor */}
            <Route path="/doctors/add" element={<DoctorAdd />} />

            {/* Rota - Tela de Editar Doctor */}
            <Route path="/doctors/edit/:id_doctor" element={<DoctorAdd />} />

            {/* ------------------------------------------------ Services ------------------------------------------------- */}

            {/* Rota - Tela de Services */}
            <Route path="/services" element={<Services />} />

            {/* Rota - Tela de Adicionar Service */}
            <Route path="/services/add" element={<ServiceAdd />} />

            {/* Rota - Tela de Editar Service */}
            <Route path="/services/edit/:id_service" element={<ServiceAdd />} />

            {/* --------------------------------------------- Doctor Services --------------------------------------------- */}

            {/* Rota - Tela de Doctor Services do Doctor */}
            <Route path="/doctors/:id_doctor/services" element={<DoctorServices />} />

            {/* Rota - Tela de Adicionar Services do Doctor */}
            <Route path="/doctors/:id_doctor/services/add" element={<DoctorServicesAdd />} />

            {/* Rota - Tela de Editar Service do Doctor */}
            <Route path="/doctors/:id_doctor/services/edit/:id_doctor_service" element={<DoctorServicesAdd />} />

        </Routes>
    </BrowserRouter>

}

// Exportando o componente de Rotas
export default Rotas;