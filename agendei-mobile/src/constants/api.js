/**
 * * Arquivo de API
 * ------------------------------------------------
*/

// Importação do axios
import axios from "axios";

// Configurar a URL base da API
const api = axios.create({
    // Toda vez que o app for fazer uma requisição, o começo da URL vai ser essa
    baseURL: "http://192.168.0.7:3001",
});

export default api;