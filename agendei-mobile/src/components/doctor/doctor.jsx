/**
 * * Componente de médico para renderizar os médicos na lista com uma formatação do componente
 */

// Importando os estilos
import { styles } from "./doctor.style.js"

// Importando os componentes
import icon from "../../constants/icon.js";

// Importações do react-native
import { Image, TouchableOpacity, View, Text } from "react-native";

function Doctor(props) {

    return <TouchableOpacity style={styles.doctor} 
    onPress={() => props.onPress(props.id_doctor, props.name, props.specialty, props.icon)}>

        {/* Ícone do médico (masculino M ou feminino F) */}
        <Image source={props.icon == "M" ? icon.male : icon.female} style={styles.icon}/>

        {/* Textos do médico */}
        <View>
            {/* Nome do médico */}
            <Text style={styles.name}>{props.name}</Text>

            {/* Especialidade do médico */}
            <Text style={styles.specialty}>{props.specialty}</Text>
        </View>

    </TouchableOpacity>

}

export default Doctor;