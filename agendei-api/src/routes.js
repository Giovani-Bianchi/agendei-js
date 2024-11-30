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

// Criando uma rota por GET para servir a lista de serviços. É necessário primeiramente validar o Token para permitir o acesso a lista de serviços, caso a validação seja sucedida, através do 'next()', a rota é executada com o método 'Filtrar'
router.get('/services/filter', jwt.ValidateToken, controllerDService.Filtrar);

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

// ------------------------------------------------------------------------------------------------

// * Exportando o Router
export default router;