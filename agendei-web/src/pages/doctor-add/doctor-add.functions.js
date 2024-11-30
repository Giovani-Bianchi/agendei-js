/*
    * Arquivo de Funções do Componente de Doctor Add
    ----------------------------------------------------------------------------------------------------------
*/

// Importação da API
import api from "../../constants/api.js";

/* --------------------------------------------------------------------------------------------------------
 * Função para salvar/editar o médico
---------------------------------------------------------------------------------------------------------- */

export const saveDoctor = async (id_doctor, doctor, specialty, gender, navigate) => {
        
    // Objeto json para armazenar os dados do médico para o salvamento, nomeando a qual campo cada variável pertence quando fizer o POST. Estamos puxando os valores das nossas variáveis de estado conforme o que o usuário escolheu
    const json = {
        name: doctor,
        specialty: specialty,
        icon: gender
    }

    // Tentar salvar o médico com a requisição para a API
    try {
            
        // Criando a requisição de novo/editar médico para a API, o segundo parâmetro é o que vai no corpo da requisição, passamos o objeto json contendo os valores para ele. Se o id_doctor for maior que 0 (ou seja, se ele existe), então é um médico existente e vamos editar, caso contrário, é um novo médico
        const response = id_doctor > 0 ? 
        await api.put("/doctors/" + id_doctor, json) : 
        await api.post("/doctors", json);

        // Se conseguiu inserir o médico, redireciona o usuário para a lista
        if (response.data) {
            navigate("/doctors");
        }

    }
        
    // Se não conseguir, trata o erro que ocorreu, aqui é para erros que vieram do servidor (API)
    catch (error) {

        // Se dentro do error, conseguiu obter o response e dentro do response existe a propriedade data e dentro da data há qual é o erro (? significa que pode não existir)
        if (error.response?.data.error) {
            // Se o usuário não for autorizado a acessar essa tela, redireciona para a tela de login
            if (error.response.status == 401) {
                return navigate('/');
            }

            alert(error.response?.data.error);
        }

        // Se não conseguiu obter qual é o erro vindo do servidor, então exibe a mensagem de erro padrão
        else {
            alert("Erro ao salvar dados. Tente novamente mais tarde.");
        }

    }

}

/* --------------------------------------------------------------------------------------------------------
 * Função para carregar os dados do médico com base no id_doctor
---------------------------------------------------------------------------------------------------------- */

export const loadDoctor = async (id_doctor, setDoctor, setSpecialty, setGender, navigate) => {

    // Tentar executar a requisição GET
    try {
            
        // Criando a requisição de capturar os dados do médico pelo ID para a API usando o método GET
        const response = await api.get("/admin/doctors/" + id_doctor);

        // Se obteve os dados de retorno da API, irá popular cada uma das variáveis de estado com os dados retornados da API, para preparar para a alteração futuramente
        if (response.data) {
            setDoctor(response.data.name);
            setSpecialty(response.data.specialty);
            setGender(response.data.icon);
        }

    }
        
    // Se não conseguir, trata o erro que ocorreu, aqui é para erros que vieram do servidor (API)
    catch (error) {

        // Se dentro do error, conseguiu obter o response e dentro do response existe a propriedade data e dentro da data há qual é o erro (? significa que pode não existir)
        if (error.response?.data.error) {
            // Se o usuário não for autorizado a acessar essa tela, redireciona para a tela de login
            if (error.response.status == 401) {
                return navigate('/');
            }

            alert(error.response?.data.error);
        }

        // Se não conseguiu obter qual é o erro vindo do servidor, então exibe a mensagem de erro padrão
        else {
            alert("Erro ao listar médico. Tente novamente mais tarde.");
        }

    }

}