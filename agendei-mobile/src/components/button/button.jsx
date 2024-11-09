/**
 * * Componente de Botão
*/

// Importando os estilos
import { styles } from  "./button.style.js";

// Importações do react-native
import { Text, TouchableOpacity } from "react-native";

// Criando a função
function Button(props) {

    // Se a propriedade "theme" for igual a "danger", aplicar o styles.danger, senão aplicar o styles.primary
    return <TouchableOpacity onPress={props.onPress} style={[styles.btn, props.theme == "danger" ? styles.danger : styles.primary]}>

        <Text style={styles.text}>
            {props.text}
        </Text>

    </TouchableOpacity>

}

// Exportando o botão
export default Button;