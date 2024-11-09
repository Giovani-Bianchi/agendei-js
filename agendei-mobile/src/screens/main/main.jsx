/**
 * * Tela Main - Irá conter a navegação entre todas as telas do aplicativo (abahome, abacalendar e abaprofile), com as bottom navigations
 */

// Importações do react-native
import { Image, Text } from 'react-native';

// Importações do react-navigation
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Importações dos Componentes de Aba
import AbaHome from "../abahome/abahome.jsx";
import AbaCalendar from "../abacalendar/abacalendar.jsx";
import AbaProfile from "../abaprofile/abaprofile.jsx";

// Importando as Imagens
import icon from "../../constants/icon.js";

// Importando os estilos
import { COLORS, FONT_SIZE } from '../../constants/theme.js';

// Instanciando o Tab
const Tab = createBottomTabNavigator();

function Main() {

    return <Tab.Navigator>

            {/* Tab.Screen - Aba Home - Options chama um objeto para poder formatar a Aba Home com funções já prontas do react-navigation */}
            <Tab.Screen name="Home" component={AbaHome} options={{
                headerTitleAlign: "center",
                headerTitle: () => {
                    return <Image source={icon.logo} style={{width: 125, height: 30}} />
                },
                tabBarIcon: ({focused}) => {
                    return <Image source={icon.home} style={{width: 35, height: 35, opacity: focused ? 1 : 0.3}} />
                },
                tabBarShowLabel: false,
                unmountOnBlur: true // Remonta a tela toda vez que entrar nessa aba, assim recarrega as reservas feitas para atualizar certo após uma exclusão
            }} />

            {/* Tab.Screen - Aba Calendar - Options chama um objeto para poder formatar a Aba Calendar com funções já prontas do react-navigation */}
            <Tab.Screen name="Calendário" component={AbaCalendar} options={{
                headerTitleAlign: "center",
                headerTitle: () => {
                    return <Text style={{fontSize: FONT_SIZE.lg, color: COLORS.blue, fontWeight: "bold"}}>Minhas Reservas</Text>
                },
                tabBarIcon: ({focused}) => {
                    return <Image source={icon.calendar} style={{width: 35, height: 35, opacity: focused ? 1 : 0.3}} />
                },
                tabBarShowLabel: false,
                unmountOnBlur: true // Remonta a tela toda vez que entrar nessa aba, assim recarrega as reservas feitas para atualizar certo após uma exclusão
            }} />

            {/* Tab.Screen - Aba Profile - Options chama um objeto para poder formatar a Aba Profile com funções já prontas do react-navigation */}
            <Tab.Screen name="Perfil" component={AbaProfile} options={{
                headerTitleAlign: "center",
                headerTitle: () => {
                    return <Text style={{fontSize: FONT_SIZE.lg, color: COLORS.blue, fontWeight: "bold"}}>Meu Perfil</Text>
                },
                tabBarIcon: ({focused}) => {
                    return <Image source={icon.profile} style={{width: 35, height: 35, opacity: focused ? 1 : 0.3}} />
                },
                tabBarShowLabel: false,
                unmountOnBlur: true // Remonta a tela toda vez que entrar nessa aba
            }} />

        </Tab.Navigator>

}

export default Main;