/*
    ? API - Com Axios
    ----------------------------------------------------------------------------------------------------------
    * Aqui fica o axios, que ajuda muito na hora de construir as requisições para a API

    * É muito interessante usar esse esquema da baseURL com o axios pois se algum dia por exemplo for necessário publicar essa API na nuvem, só é necessários mudar a baseURL e não ter que mudar a URL de cada requisição, facilitando muito a manutenção do código
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