/**
 * * Sempre comece a função com letra maiúscula
 * * É necessário importar os componentes para poder usar eles
 * 
 * * PROPRIEDADES - Sempre que for usar um componente em React, é passado props dentro deles, ou seja, propriedades que nós mesmo criamos e damos o nome delas
 * * É passado 'props' dentro da função para indicar que será utilizado as 'props' dentro da função
 * * Ao chamar o componente, passa se o valor daquela propriedade
 * 
 * * Uma {} é para indicar código JS e outro {} dentro seria o objeto JS, resultando em {{}}
 * 
 * * Esse arquivo button.jsx tem toda a estrutura visual e o button.style.js tem a estilização
 * 
 * * Para adicionar mais de uma classe no styles é necessário utilizar dentro de um colchetes [], assim é possível adicionar duas classes ao mesmo elemento
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

// Exportando o botão para quem quiser usar, conseguir
export default Button;