/*
    * Arquivo de Rotas - Todo o mapeamento das páginas da nossa aplicação estará aqui
    ----------------------------------------------------------------------------------------------------------
*/

// Importações do react-router-dom
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

// Importação do useAuth
import { useAuth } from "./contexts/auth-context.jsx";

// Importação do GlobalLayout
import GlobalLayout from "./global-layout.jsx";

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

// Função ProtectedRoute que verifica se o usuário está autenticado
export function ProtectedRoute({ children }) {

    // Objeto contendo o token e o loading do useAuth
    const { token, loading } = useAuth();

    // Se loading for true, retorna um spinner de loading do Bootstrap indicando que está em carregamento, ou seja, que está no proceso de verificar o token no localStorage
    if (loading) {
        return <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>;
    }

    // Se existir o token (for true), retorna o children do ProtectedRoute (que será uma rota), senão redireciona para a página de login
    return token ? children : <Navigate to="/login" replace />;

}

export function AppRoutes() {

    // Retornando o BrowserRouter
    return (
        <BrowserRouter>
            <GlobalLayout>
                    
                <Routes>

                    {/* ------------------------------------------------- Auth --------------------------------------------------- */}

                    {/* Rota - Tela de Login */}
                    <Route path="/login" element={<Login />} />

                    {/* Rota - Tela de Register */}
                    <Route path="/register" element={<Register />} />

                    {/* ---------------------------------------------- Appointments ---------------------------------------------- */}

                    {/* Rota - Tela de Appointments */}
                    <Route path="/" element={<ProtectedRoute><Appointments /></ProtectedRoute>} />

                    {/* Rota - Tela de Adicionar Appointment */}
                    <Route path="/appointments/add" element={<ProtectedRoute><AppointmentAdd /></ProtectedRoute>} />

                    {/* Rota - Tela de Editar Appointment */}
                    <Route path="/appointments/edit/:id_appointment" element={<ProtectedRoute><AppointmentAdd /></ProtectedRoute>} />

                    {/* ------------------------------------------------- Doctors ------------------------------------------------- */}

                    {/* Rota - Tela de Doctors */}
                    <Route path="/doctors" element={<ProtectedRoute><Doctors /></ProtectedRoute>} />

                    {/* Rota - Tela de Adicionar Doctor */}
                    <Route path="/doctors/add" element={<ProtectedRoute><DoctorAdd /></ProtectedRoute>} />

                    {/* Rota - Tela de Editar Doctor */}
                    <Route path="/doctors/edit/:id_doctor" element={<ProtectedRoute><DoctorAdd /></ProtectedRoute>} />

                    {/* ------------------------------------------------ Services ------------------------------------------------- */}

                    {/* Rota - Tela de Services */}
                    <Route path="/services" element={<ProtectedRoute><Services /></ProtectedRoute>} />

                    {/* Rota - Tela de Adicionar Service */}
                    <Route path="/services/add" element={<ProtectedRoute><ServiceAdd /></ProtectedRoute>} />

                    {/* Rota - Tela de Editar Service */}
                    <Route path="/services/edit/:id_service" element={<ProtectedRoute><ServiceAdd /></ProtectedRoute>} />

                    {/* --------------------------------------------- Doctor Services --------------------------------------------- */}

                    {/* Rota - Tela de Doctor Services do Doctor */}
                    <Route path="/doctors/:id_doctor/services" element={<ProtectedRoute><DoctorServices /></ProtectedRoute>} />

                    {/* Rota - Tela de Adicionar Services do Doctor */}
                    <Route path="/doctors/:id_doctor/services/add" element={<ProtectedRoute><DoctorServicesAdd /></ProtectedRoute>} />

                    {/* Rota - Tela de Editar Service do Doctor */}
                    <Route path="/doctors/:id_doctor/services/edit/:id_doctor_service" element={<ProtectedRoute><DoctorServicesAdd /></ProtectedRoute>} />

                </Routes>

            </GlobalLayout>
        </BrowserRouter>
    )
}