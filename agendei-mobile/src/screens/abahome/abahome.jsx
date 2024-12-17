/**
 * * Aba Home
 */

// Importando os estilos
import { styles } from './abahome.style.js';

// Importações dos componentes
import Doctor from '../../components/doctor/doctor.jsx';

// Importações do react-native
import { Alert, FlatList, Text, View } from "react-native";

// Importações do react
import { useEffect, useState } from 'react';

// Importação da API
import api from '../../constants/api.js';

function AbaHome(props) {

    // Criando uma variável de estado para a lista de médicos
    const [ doctors, setDoctors ] = useState([]);

    // Criar a requisição para fazer o GET na rota /doctors/{id}/services
    async function LoadDoctors() {
        
        // Bloco para tratar erro com try catch
        try {

            // Constante de response para fazer uma requisição para a API com o método GET na rota /doctors. O token já vem configurado no header quando usamos o api.
            const response = await api.get("/doctors");

            // Se a requisição foi bem sucedida, pega os dados e joga para a função de setDoctor para popular a variável doctors e então poder carregar os médicos
            if (response.data) {
                setDoctors(response.data);
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

    // Função ClickDoctor - É passado para o componente de Doctor como um props, para que ele possa ser chamado
    function ClickDoctor(id_doctor, name, specialty, icon) {

        // Chamando a função de navegação para ir para a página de serviços do médico, passando os dados do médico nos parâmetros da função
        props.navigation.navigate("services", {
            id_doctor, 
            name, 
            specialty, 
            icon
        });

    }

    // Usando o hooker de useEffect para executar o LoadDoctors quando o componente for carregado.
    useEffect(() => {
        LoadDoctors();
    }, []);

    return <View style={styles.container}>

        {/* Texto de agende os seus serviços médicos */}
        <Text style={styles.text}>Agende os seus serviços médicos</Text>

        {/* Lista de médicos, doc é o objeto que irá capturar os dados através do id_doctor. Sempre que renderizar a lista, irá chamar a função passando o objeto 'doc'
        que contém o médico específico, chamando cada vez para cada médico na lista, como um foreach. 'item' é o que acessa os médicos na renderização dos itens. */}
        {doctors.length > 0 ? (
            <FlatList data={doctors} keyExtractor={(doc) => doc.id_doctor} showsVerticalScrollIndicator={false} renderItem={({item}) => {
                    return <Doctor id_doctor={item.id_doctor}
                        name={item.name} /* Nome do médico */
                        icon={item.icon} /* Se o icon vindo da fonte de dados possuir o valor de "M", usar o ícone "male", senão usar o ícone "female" */
                        specialty={item.specialty} /* Especialidade do médico */
            
                        // Ao clicar no componente de Doctor, irá redirecionar para a página de serviços do médico carregando a função 'ClickDoctor'
                        onPress={ClickDoctor}
                    />
                }}
            />
        ) : 

        (
            // Se a lista de médicos estiver vazia, exibe um texto indicando que não há médicos disponíveis
            <Text style={styles.emptyText}>Nenhum médico encontrado</Text>
        )}

    </View>

}

export default AbaHome;