/**
 * * Arquivo de Rotas
 * ------------------------------------------------
 */

// * Importações

// Importando o Router do Express
import { Router } from "express";

// Importando o Token JWT
import jwt from "./token.js";

// Importando os Controllers
import controllerDoctor from "./controllers/controller.doctor.js";
import controllerUser from "./controllers/controller.user.js";
import controllerAppointment from "./controllers/controller.appointment.js";
import controllerDService from "./controllers/controller.dservice.js";

// * Instanciando o Router
const router = Router();

// * --------------------------------------ROTAS DA APLICAÇÃO--------------------------------------

//  --------------------------------------------DOCTORS--------------------------------------------

// Criando uma rota por GET para servir a lista de médicos. É necessário primeiramente validar o Token para permitir o acesso a lista de médicos, caso a validação seja sucedida, através do 'next()', a rota é executada com o método 'Listar'
router.get('/doctors', jwt.ValidateToken, controllerDoctor.Listar);

// Criando uma rota por GET para servir a lista de médicos. É necessário primeiramente validar o Token para permitir o acesso a lista de médicos, caso a validação seja sucedida, através do 'next()', a rota é executada com o método 'Listar'
router.get('/doctors/filter', jwt.ValidateToken, controllerDoctor.Filtrar);

// Criando uma rota por POST para criar um novo médico. É necessário primeiramente validar o Token para permitir o acesso a inserção de médicos, caso a validação seja sucedida, através do 'next()', a rota é executada com o método 'Inserir'
router.post('/doctors', jwt.ValidateToken, controllerDoctor.Inserir);

// Criando uma rota por PUT para editar um médico, passando o id do médico para a URL (id_doctor). É necessário primeiramente validar o Token para permitir o acesso a edição de médicos, caso a validação seja sucedida, através do 'next()', a rota é executada com o método 'Editar'
router.put('/doctors/:id_doctor', jwt.ValidateToken, controllerDoctor.Editar);

// Criando uma rota por DELETE para excluir um médico, passando o id do médico para a URL (id_doctor). É necessário primeiramente validar o Token para permitir o acesso a exclusão de médicos, caso a validação seja sucedida, através do 'next()', a rota é executada com o método 'Excluir'
router.delete('/doctors/:id_doctor', jwt.ValidateToken, controllerDoctor.Excluir);

// Services

// Criando uma rota por GET para listar os serviços dos médicos. É necessário primeiramente validar o Token para permitir o acesso a lista de serviços de médicos, caso a validação seja sucedida, através do 'next()', a rota é executada com o método 'ListarServicos'
router.get('/doctors/:id_doctor/services', jwt.ValidateToken, controllerDoctor.ListarServicos);

// Criando uma rota por POST para inserir o serviço dos médico. É necessário primeiramente validar o Token para permitir o acesso a inserção do serviço do médico, caso a validação seja sucedida, através do 'next()', a rota é executada com o método 'InserirServico'
router.post('/doctors/:id_doctor/services', jwt.ValidateToken, controllerDoctor.InserirServico);

// Criando uma rota por DELETE para excluir um serviço do médico, passando o id do médico para a URL (id_doctor) e o id do serviço do médico (id_doctor_service). É necessário primeiramente validar o Token para permitir o acesso a exclusão de serviços do médico, caso a validação seja sucedida, através do 'next()', a rota é executada com o método 'ExcluirServico'
router.delete('/doctors/:id_doctor/services/:id_service/:id_doctor_service', jwt.ValidateToken, controllerDoctor.ExcluirServico);

// Criando uma rota por PUT para editar um serviço do médico, passando o id do médico para a URL (id_doctor) e o id do serviço do médico (id_doctor_service). É necessário primeiramente validar o Token para permitir o acesso a edição de serviços do médico, caso a validação seja sucedida, através do 'next()', a rota é executada com o método 'EditarServico'
router.put('/doctors/:id_doctor/services/:id_doctor_service', jwt.ValidateToken, controllerDoctor.EditarServico);

// ------------------------------------------------------------------------------------------------

//  ---------------------------------------------USERS---------------------------------------------

// Criando uma rota por POST para criar um novo usuário (registrar)
router.post('/users/register', controllerUser.Inserir);

// Criando uma rota por POST para realizar o Login do usuário
router.post('/users/login', controllerUser.Login);

// Criando uma rota por GET para listar o nome e email do usuário na tela de profile. É necessário primeiramente validar o Token para permitir o acesso a lista do nome e email do usuário, caso a validação seja sucedida, através do 'next()', a rota é executada com o método 'Profile'
router.get('/users/profile', jwt.ValidateToken, controllerUser.Profile);

// ------------------------------------------------------------------------------------------------

//  ------------------------------------RESERVAS (appointments)------------------------------------

// Criando uma rota por GET para listar as reservas do usuário. É necessário primeiramente validar o Token para permitir o acesso a lista de reservas do usuário, caso a validação seja sucedida, através do 'next()', a rota é executada com o método 'ListarByUser'
router.get('/appointments', jwt.ValidateToken, controllerAppointment.ListarByUser);

// Criando uma rota por POST para criar uma reserva como usuário. É necessário primeiramente validar o Token para permitir o acesso a inserir uma reserva como usuário, caso a validação seja sucedida, através do 'next()', a rota é executada com o método 'Inserir'
router.post('/appointments', jwt.ValidateToken, controllerAppointment.Inserir);

// Criando uma rota por DELETE para excluir uma reserva como usuário. É necessário primeiramente validar o Token para permitir o acesso a exclusão de uma reserva como usuário, caso a validação seja sucedida, através do 'next()', a rota é executada com o método 'Excluir'
router.delete('/appointments/:id_appointment', jwt.ValidateToken, controllerAppointment.Excluir);

// ------------------------------------------------------------------------------------------------

//  ----------------------------------------SERVICES-----------------------------------------------

// Criando uma rota por GET para servir a lista de serviços. É necessário primeiramente validar o Token para permitir o acesso a lista de serviços, caso a validação seja sucedida, através do 'next()', a rota é executada com o método 'Listar'
router.get('/services', jwt.ValidateToken, controllerDService.Listar);

// Criando uma rota por GET para retornar uma lista de serviços que ainda não estão vinculados a o médico específico. É necessário primeiramente validar o Token para permitir o acesso a lista de serviços, caso a validação seja sucedida, através do 'next()', a rota é executada com o método 'ListarDoctorServices'
router.get('/services/:id_doctor/:id_doctor_service', jwt.ValidateToken, controllerDService.ListarDoctorServices);

// Criando uma rota por GET para servir a lista de serviços. É necessário primeiramente validar o Token para permitir o acesso a lista de serviços, caso a validação seja sucedida, através do 'next()', a rota é executada com o método 'Filtrar'
router.get('/services/filter', jwt.ValidateToken, controllerDService.Filtrar);

// Criando uma rota por POST para criar um novo serviço. É necessário primeiramente validar o Token para permitir o acesso a inserção de serviços, caso a validação seja sucedida, através do 'next()', a rota é executada com o método 'Inserir'
router.post('/services', jwt.ValidateToken, controllerDService.Inserir);

// Criando uma rota por PUT para editar um serviço, passando o id do serviço para a URL (id_service). É necessário primeiramente validar o Token para permitir o acesso a edição de serviços, caso a validação seja sucedida, através do 'next()', a rota é executada com o método 'Editar'
router.put('/services/:id_service', jwt.ValidateToken, controllerDService.Editar);

// Criando uma rota por DELETE para excluir um serviço, passando o id do serviço para a URL (id_service). É necessário primeiramente validar o Token para permitir o acesso a exclusão de serviços, caso a validação seja sucedida, através do 'next()', a rota é executada com o método 'Excluir'
router.delete('/services/:id_service', jwt.ValidateToken, controllerDService.Excluir);

// ------------------------------------------------------------------------------------------------

//  --------------------------------------ROTAS ADMIN----------------------------------------------

// Criando uma rota por POST para criar um novo admin (registrar)
router.post('/admin/register', controllerUser.InserirAdmin);

// Criando uma rota por POST para realizar o Login do admin
router.post('/admin/login', controllerUser.LoginAdmin);

// Criando uma rota por GET para listar as reservas para o Admin. É necessário primeiramente validar o Token para permitir o acesso a lista de reservas para o Admin, caso a validação seja sucedida, através do 'next()', a rota é executada com o método 'Listar'
router.get('/admin/appointments', jwt.ValidateToken, controllerAppointment.Listar);

// Criando uma rota por GET para listar os pacientes para o Admin. É necessário primeiramente validar o Token para permitir o acesso a lista de pacientes para o Admin, caso a validação seja sucedida, através do 'next()', a rota é executada com o método 'Listar'
router.get('/admin/users', jwt.ValidateToken, controllerUser.Listar);

// Criando uma rota por POST para criar um novo agendamento. É necessário primeiramente validar o Token para permitir a criação do agendamento, caso a validação seja sucedida, através do 'next()', a rota é executada com o método 'InserirAdmin'
router.post('/admin/appointments', jwt.ValidateToken, controllerAppointment.InserirAdmin);

// Criando uma rota por GET para exibir os dados na tela de edição referente àquele agendamento para a edição posteriormente. É necessário primeiramente validar o Token para permitir o acesso aos dados da reserva para o Admin, caso a validação seja sucedida, através do 'next()', a rota é executada com o método 'ListarId'
router.get('/admin/appointments/:id_appointment', jwt.ValidateToken, controllerAppointment.ListarId);

// Criando uma rota por PUT para editar os dados da reserva com base no id. É necessário primeiramente validar o Token para permitir a edição da reserva, caso a validação seja sucedida, através do 'next()', a rota é executada com o método 'Editar'
router.put('/admin/appointments/:id_appointment', jwt.ValidateToken, controllerAppointment.EditarAdmin);

// Criando uma rota por GET para exibir os dados na tela de edição referente àquele médico para a edição posteriormente. É necessário primeiramente validar o Token para permitir o acesso aos dados do médico para o Admin, caso a validação seja sucedida, através do 'next()', a rota é executada com o método 'ListarId'
router.get('/admin/doctors/:id_doctor', jwt.ValidateToken, controllerDoctor.ListarId);

// Criando uma rota por GET para exibir os dados na tela de edição referente àquele serviço para a edição posteriormente. É necessário primeiramente validar o Token para permitir o acesso aos dados do serviço para o Admin, caso a validação seja sucedida, através do 'next()', a rota é executada com o método 'ListarId'
router.get('/admin/services/:id_service', jwt.ValidateToken, controllerDService.ListarId);

// Criando uma rota por GET para exibir os dados na tela de edição referente àquele serviço do médico para a edição posteriormente. É necessário primeiramente validar o Token para permitir o acesso aos dados do serviço do médico para o Admin, caso a validação seja sucedida, através do 'next()', a rota é executada com o método 'CapturarDoctorService'
router.get('/admin/doctors/:id_doctor/services/:id_doctor_service', jwt.ValidateToken, controllerDService.CapturarDoctorService);

// ------------------------------------------------------------------------------------------------

// * Exportando o Router
export default router;