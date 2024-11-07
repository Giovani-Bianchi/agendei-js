/**
 * * Tela de Services
 */

// Importando os estilos
import { styles } from './services.style.js';

// Importações dos componentes
import icon from '../../constants/icon.js';
import Service from '../../components/service/service.jsx';

// Importações do react-native
import { Alert, FlatList, Image, Text, View } from "react-native";

// Importações do react
import { useEffect, useState } from 'react';

// Importação da API
import api from '../../constants/api.js';

function Services(props) {

    // Declarando as variáveis para poder mostras as informações dinâmicamente, isso foi recebido ao clicar no médico e executar a função
    const id_doctor = props.route.params.id_doctor;
    const name = props.route.params.name;
    const specialty = props.route.params.specialty;
    const iconDoctor = props.route.params.icon;

    // Criando uma variável de estado para a lista de serviços
    const [ doctorServices, setDoctorServices ] = useState([]);

    // Cria uma função para redirecionar o usuário para a tela de calendário passando os parâmetros necessários
    function ClickService(id_service) {

        // Chamando a função de navegação para ir para a página de calendário, passando o id do serviço como parâmetro da função
        props.navigation.navigate("schedule", {
            id_doctor,
            id_service
        });

    }

    // Criar a requisição para fazer o GET na rota /doctors/{id}/services
    async function LoadServices() {

        // Bloco para tratar erro com try catch
        try {

            // Constante de response para fazer uma requisição para a API com o método GET na rota /doctors/{id}/services.
            const response = await api.get("/doctors/" + id_doctor + "/services");

            // Se a requisição foi bem sucedida, pega os dados e joga para a função de setDoctorServices para popular a variável doctorServices e então poder carregar os serviços do médico do id indicado no id_doctor
            if (response.data) {
                setDoctorServices(response.data);
            }

        }
        
        // Se a requisição falhar, ...
        catch (error) {

            // Se dentro do que ele devolveu há uma resposta, e dentro da resposta tenho os dados dela e tenho um error lá dentro, exibe o Alert com o conteúdo do error. A ? é para indicar que o response pode ser que não exista
            if(error.response?.data.error) {
                Alert.alert(error.response.data.error);
            }

            // Se não receber o response, exibe um Alert indicando erro
            else {
                Alert.alert("Ocorreu um erro. Tente novamente mais tarde");
            }
            
        }

    }

    // Usando o hooker de useEffect para executar o LoadServices quando o componente for carregado. Executa essa função toda vez que o critério for atingido. Como não estamos passando nenhum critério, quando a tela/componente é aberta/montado, ele vai executar uma única vez. Executa a função quando a tela é carregada
    useEffect(() => {
        LoadServices();
    }, []);

    return <View style={styles.container}>

        {/* Banner do médico */}
        <View style={styles.banner}>
            {/* Ícone */}
            <Image source={iconDoctor == "M" ? icon.male : icon.female} />

            {/* Nome do médico e especialidade */}
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.specialty}>{specialty}</Text>
        </View>

        {/* Lista de serviços dos médicos */}
        <FlatList data={doctorServices} keyExtractor={(serv) => serv.id_service} showsVerticalScrollIndicator={false} renderItem={({item}) => {
            return <Service id_service={item.id_service}
            description={item.description} 
            price={item.price}

            // Ao clicar no componente de Serviço, irá redirecionar para a página de calendário carregando a função 'ClickService'
            onPress={ClickService}
            />
        }} />

    </View>

}

export default Services;