/**
 * ? Arquivo de Rotas Abertas
 * ------------------------------------------------
 * * Responsável por manejar as rotas da aplicação que não necessitam de autenticação do usuário
*/

// Importação do native-stack do react-navigation
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Instanciando o native-stack
const Stack = createNativeStackNavigator();

// Importando os componentes de tela
import Login from '../screens/login/login.jsx';
import Account from '../screens/account/account.jsx';


function RoutesOpen() {

    return <Stack.Navigator>

        {/* Tela de Login */}
        <Stack.Screen name="login" component={Login}
            options={{
                headerShown: false // Desaparece com o título da tela

            }}
        />

        {/* Tela de Registro */}
        <Stack.Screen name="account" component={Account}
            options={{
                headerShown: false // Desaparece com o título da tela
            }}
        />

    </Stack.Navigator>

}

// Exportando a função RoutesOpen
export default RoutesOpen;