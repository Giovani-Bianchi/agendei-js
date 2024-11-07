/**
 * * Tela de Registro
 */

// Importando os estilos
import { styles } from "./account.style";

// Importações do react
import { useState } from "react";

// Importações do react-native
import { Alert, Image, Text, TextInput, TouchableOpacity, View } from "react-native";

// Importação da API
import api from "../../constants/api.js";

// Importações dos componentes
import Button from "../../components/button/button";

// Importação da Coleção de Ícones
import icon from "../../constants/icon.js";

// Criação da função de Login
function Account(props) {

    // Criação das variáveis de estado (hook) para armazenar os dados do usuário
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Criar a requisição para fazer o POST na rota users/register com o corpo da requisição, para executar de fato o registro
    async function ExecuteAccount() {

        // Bloco para tratar erro com try catch
        try {

            // Primeiro parâmetro é a rota com o método, segundo parâmetro é o corpo da requisição
            const response = await api.post("/users/register", {
                name,
                email,
                password
            });

            // Se a requisição foi bem sucedida, ...
            if(response.data) {
                console.log(response.data);
            }

        } 
        
        // Se a requisição falhar, ...
        catch (error) {

            // Se dentro do que ele devolveu há uma resposta, e dentro da resposta tenho os dados dela e tenho um error lá dentro, exibe o Alert com o conteúdo do error. A ? é para indicar que o response pode ser que não exista
            if(error.response?.data.error) {
                Alert.alert(error.response.data.error);
            }

            // Se não receber o response, exibe um Alert indicando erro no registro
            else {
                Alert.alert("Ocorreu um erro. Tente novamente mais tarde");
            }
            
        }

    }

    // Retornando a view container
    return <View style={styles.container}>

        {/* Logo do Projeto */}
        <View style={styles.containerLogo}>
            <Image source={icon.logo} style={styles.logo} />
        </View>

        {/* Inputs e Botão de Acessar */}
        <View>
            <View style={styles.containerInput}>
                <TextInput style={styles.input} placeholder="Nome" 
                onChangeText={(text) => setName(text)}
                />
            </View>

            <View style={styles.containerInput}>
                <TextInput style={styles.input} placeholder="E-mail" 
                onChangeText={(text) => setEmail(text)}
                />
            </View>

            <View style={styles.containerInput}>
                <TextInput style={styles.input} placeholder="Senha" secureTextEntry={true} 
                onChangeText={(text) => setPassword(text)}
                />
            </View>

            <Button text="Criar Conta" onPress={ExecuteAccount} />
        </View>

        {/* Footer */}
        <View style={styles.footer}>
            <Text style={styles.footerText}>Já tenho conta. </Text>
            <TouchableOpacity onPress={() => props.navigation.goBack()}>
                <Text style={styles.footerLink}>Fazer login.</Text>
            </TouchableOpacity>
        </View>

    </View>

}

// Exportando a tela de Registro, que também é um componente, mas que agrupa subcomponentes em sua composição
export default Account;