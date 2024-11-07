/**
 * ? Arquivo de Rotas Fechadas (protegidas, que precisam de autenticação)
 * ------------------------------------------------
 * * Responsável por manejar as rotas da aplicação que necessitam de autenticação do usuário
*/

// Importação do native-stack do react-navigation
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Instanciando o native-stack
const Stack = createNativeStackNavigator();

// Importando a constante de cores
import { COLORS } from '../constants/theme.js';

// Importando os componentes de tela
import Main from "../screens/main/main.jsx";
import Services from "../screens/services/services.jsx";
import Schedule from "../screens/schedule/schedule.jsx";

function RoutesPrivate() {

    return <Stack.Navigator>

        {/* Tela Main - Abre as tabs (home, appointment e profile) */}
        <Stack.Screen name="main" component={Main}
            options={{
                headerShown: false // Desaparece com o título da tela
            }}
        />

        {/* Tela de Serviços */}
        <Stack.Screen name="services" component={Services}
            options={{
                headerTitle: "Serviços",
                headerTitleAlign: "center",
                headerShadowVisible: false,
                headerTintColor: COLORS.white,
                headerStyle: {
                    backgroundColor: COLORS.blue
                }
            }}
        />

        {/* Tela de Calendário */}
        <Stack.Screen name="schedule" component={Schedule}
            options={{
                headerTitle: "Fazer uma reserva",
                headerTitleAlign: "center",
                headerShadowVisible: false,
                headerTintColor: COLORS.blue,
            }}
        />
        
    </Stack.Navigator>

}

// Exportando a função RoutesPrivate
export default RoutesPrivate;