/**
 * * Tela de Perfil
 */

// Importando os estilos
import { styles } from "./abaprofile.style.js";

// Importando os componentes
import Button from "../../components/button/button.jsx";

// Importações do react-native
import { Alert, Text, View } from "react-native";

// Importações do react
import { useContext, useEffect, useState } from "react";

// Importação do AuthContext
import { AuthContext } from "../../contexts/auth.js";

// Importação da API
import api from "../../constants/api.js";

function AbaProfile() {

    // Criando uma variável de estado para os dados do usuário de nome
    const [ name, setName ] = useState("");

    // Criando uma variável de estado para os dados do usuário de email
    const [ email, setEmail ] = useState("");

    // Constando do setUser do AuthContext para pegar os dados do usuário para desconectá-lo
    const { setUser } = useContext(AuthContext);

    async function LoadProfile() {

        // Bloco para tratar erro com try catch
        try {

            // Constante de response para fazer uma requisição para a API com o método GET na rota /users/profile. 
            const response = await api.get("/users/profile");

            // Se a requisição foi bem sucedida e foi recebido um nome, passa o response com os dados do usuário de nome e email com base no id da api.
            if (response.data?.name) {
                setName(response.data.name);
                setEmail(response.data.email);
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

    function Logout() {

        // Limpa o token do header de authotization da api para desconectar o usuário
        api.defaults.headers.common['Authorization'] = "";
        
        // Acessa a função do setUser do AuthContext contendo todos os dados do usuário e passa null para desconectar o usuário
        setUser({});

    }

    // Usando o hooker de useEffect para executar o LoadProfile quando o componente for carregado.
    useEffect(() => {
        LoadProfile();
    }, []);

    return <View style={styles.container}>
        
        {/* Item de Nome */}
        <View style={styles.item}>
            <Text style={styles.title}>Nome</Text>
            <Text style={styles.text}>{name}</Text>
        </View>

        {/* Item de E-mail */}
        <View style={styles.item}>
            <Text style={styles.title}>E-mail</Text>
            <Text style={styles.text}>{email}</Text>
        </View>

        {/* Item de Botão */}
        <View style={styles.button}>
            <Button text="Desconectar" theme="danger" 

            // Ao pressionar o botão irá desconectar o usuário
            onPress={Logout}
            />
        </View>

    </View>

}

export default AbaProfile;