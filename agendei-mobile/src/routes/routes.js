/**
 * * Arquivo de Rotas
 * ------------------------------------------------
*/

// Importação dos Arquivos de Rotas
import RoutesOpen from "./routesOpen.js";
import RoutesPrivate from "./routesPrivate.js";

// Importação do useContext do react para ser possível usar o contexto
import { useContext } from "react";

// Importação do contexto do autenticador
import { AuthContext } from "../contexts/auth.js";

function Routes() {

    // Constante contendo os dados do usuário para verificar se está autenticado, se estiver, abrirá as rotas privadas, senão abrirá as rotas abertas (para o usuário autenticar). Essa constante vem do contexto do AuthContext, em qualquer lugar da aplicação que precisar dos dados de autenticação, basta usar o useContext e acessar a constante.
    const { user } = useContext(AuthContext);

    // Retorno com base se existe um id_user (se está logado), se está autenticado, abrir as rotas privadas, senão abrir as rotas abertas
    return user.id_user ? <RoutesPrivate /> : <RoutesOpen />

}

// Exportando a função Routes
export default Routes;