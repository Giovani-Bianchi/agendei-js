/*
    * API - Com Axios
    ----------------------------------------------------------------------------------------------------------
*/

// Importando o axios
import axios from 'axios';

// Instanciando o axios
const api = axios.create({
    // Passando a URL base da API. Indica que em toda requisição, o axios irá adicionar essa URL no começo sempre, não sendo preciso repeti-la em toda requisição
    baseURL: "http://localhost:3001"
});

// Exportando a função da API
export default api;