/**
 * ? Arquivo de API
 * ------------------------------------------------
 * * Ao inserir uma URL base para sua aplicação, é necessário colocar o IP da sua máquina que estará rodando a API, e não o localhost
*/

// Importação do axios
import axios from "axios";

// Configurar a URL base da API
const api = axios.create({
    // Toda vez que o app for fazer uma requisição, o começo da URL vai ser essa
    baseURL: "http://192.168.68.63:3001",
});

export default api;