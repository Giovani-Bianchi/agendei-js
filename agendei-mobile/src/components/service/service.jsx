/**
 * * Componente de serviço dos médicos
 */

// Importando os estilos
import { styles } from "./service.style.js";

// Importação dos Componentes
import Button from "../../components/button/button.jsx";

// Importações do react-native
import { Text, View } from "react-native";

function Service(props) {

    return <View style={styles.service}>

        {/* Serviço/descrição e preço */}
        <View style={styles.containerText}>

            {/* Serviço/descrição */}
            <Text style={styles.description}>{props.description}</Text>

            {/* Preço formatado */}
            <Text style={styles.price}>
                {/* Formatação do preço para reais */}
                {new Intl.NumberFormat("pt-BR", {style: "currency", currency: "BRL"}).format(props.price)}
            </Text>

        </View>

        {/* Botão de agendar */}
        <View style={styles.containerButton}>
            <Button text="Agendar" onPress={() => props.onPress(props.id_service)} />
        </View>

    </View>

}

export default Service;