/**
 * * App - Arquivo responsável por levantar a aplicação mobile
 * ------------------------------------------------
*/

// Importação do Arquivo de Rotas
import Routes from  './src/routes/routes.js';

// Importação do react-navigation
import  { NavigationContainer } from '@react-navigation/native';

// Importação do AuthProvider, para que toda a aplicação consiga acessar ele
import { AuthProvider } from './src/contexts/auth.js';

// * Definindo e exportando a função JS. É vista como um componente chamado App que tem a responsibilidade de renderizar funções na tela, levanta a aplicação, função principal
// * Só é retornado um item, que nesse caso está retornando apenas o fragment contendo outras tags dentro
export default function App() {

    return (
        <>
            
            {/* NavigationContainer - Necessário para que o react-navigation funcione */}
            <NavigationContainer>

                {/* Envolvendo toda a aplicação com o AuthProvider */}
                <AuthProvider>

                    {/* Renderizando o componente de Routes */}
                    <Routes />

                </AuthProvider>

            </NavigationContainer>

        </>
    );

}