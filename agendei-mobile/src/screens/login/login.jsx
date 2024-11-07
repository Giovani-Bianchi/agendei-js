/**
 * * Tela de Login
 */

// Importando os estilos
import { styles } from "./login.style";

// Importações do react
import { useContext, useState } from "react";

// Importações do react-native
import { Alert, Image, Text, TextInput, TouchableOpacity, View } from "react-native";

// Importação da API
import api from "../../constants/api.js";

// Importações dos componentes
import Button from "../../components/button/button";

// Importação da Coleção de Ícones
import icon from "../../constants/icon.js";

// Importação do contexto do AuthContext
import { AuthContext } from "../../contexts/auth.js";

// Criação da função de Login
function Login(props) {

    // Importando a função do setUser do contexto do AuthContext
    const { setUser } = useContext(AuthContext)
    
    // Variáveis de estado (hook) para armazenar os dados do usuário, capturar o que ele digitar nos campos de email e senha. Para alterar o conteúdo das duas variáveis (email e password) não é jogado o conteúdo direto nelas, usa a função setEmail e setPassword para fazer isso
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Criar a requisição para fazer o POST na rota users/login com o corpo da requisição, para executar de fato o login
    async function ExecuteLogin() {

        // Bloco para tratar erro com try catch
        try {

            // Constante de response para fazer uma requisição para a API com o método POST na rota /users/login. Primeiro parâmetro é a rota com o método, segundo parâmetro é o corpo da requisição
            const response = await api.post("/users/login", {
                email,
                password
            });

            // Se a requisição foi bem sucedida, pega os dados e joga para a função de setUser do contexto do AuthContext para assim ele permitir a entrada nas rotas privadas
            if (response.data) {
                // Assim que conseguir validar o login, recebemos o objeto do usuário de login contendo os dados, e passamos o token para o axios, para a API. Passamos para o header da API o Authorization para onde formos usar nossa API, ele já estar autorizado para realizar a requisição, removendo a necessidade de passar o token  em cada requisição, o que geraria mais código e dificuldade de manutenção
                api.defaults.headers.common['Authorization'] = "Bearer " + response.data.token;
                
                // Passando para o setUser os dados do usuário
                setUser(response.data);
            }

        }
        
        // Se a requisição falhar, ...
        catch (error) {

            // Se dentro do que ele devolveu há uma resposta, e dentro da resposta tenho os dados dela e tenho um error lá dentro, exibe o Alert com o conteúdo do error. A ? é para indicar que o response pode ser que não exista
            if(error.response?.data.error) {
                Alert.alert(error.response.data.error);
            }

            // Se não receber o response, exibe um Alert indicando erro no login
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
                <TextInput style={styles.input} placeholder="E-mail" 
                onChangeText={(text) => setEmail(text)}
                />
            </View>

            <View style={styles.containerInput}>
                <TextInput style={styles.input} placeholder="Senha" secureTextEntry={true} 
                onChangeText={(text) => setPassword(text)}
                />
            </View>

            <Button text="Acessar" onPress={ExecuteLogin} />
        </View>

        {/* Footer */}
        <View style={styles.footer}>
            <Text style={styles.footerText}>Não tenho conta. </Text>
            <TouchableOpacity onPress={() => props.navigation.navigate("account")}>
                <Text style={styles.footerLink}>Criar conta agora.</Text>
            </TouchableOpacity>
        </View>

    </View>

}

// Exportando a tela de Login, que também é um componente, mas que agrupa subcomponentes em sua composição
export default Login;