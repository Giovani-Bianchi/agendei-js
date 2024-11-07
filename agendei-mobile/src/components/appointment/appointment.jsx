/**
 * * Componente de consulta marcada
 */

// Importando os estilos
import { styles } from "./appointment.style.js";

// Importação dos Componentes
import icon from "../../constants/icon.js";
import Button from "../button/button.jsx";

// Importações react-native
import { Image, Text, View } from "react-native";

function Appointment(props) {

    // Converter a data e o horário para o formato desejado 
    // 2024-11-15T08:30:00
    const dt = new Date(props.bookingDate + "T" + props.bookingHour);

    return <View style={styles.appointment}>

        {/* Serviço e nome do médico */}
        <Text style={styles.name}>{props.service} - {props.doctor}</Text>

        {/* Especialidade */}
        <Text style={styles.specialty}>{props.specialty}</Text>

        {/* Container de data/horário e botão */}
        <View style={styles.container}>

            {/* Container de data e horário */}
            <View style={styles.containerBooking}>

                {/* Data */}
                <View style={styles.booking}>
                    <Image style={styles.icon} source={icon.calendar} />
                    <Text style={styles.bookingDate}>{dt.toLocaleDateString()}</Text>
                </View>

                {/* Horário */}
                <View style={styles.booking}>
                    <Image style={styles.icon} source={icon.clock} />
                    <Text style={styles.bookingHour}>{props.bookingHour}h</Text>
                </View>

            </View>

            {/* Container do botão */}
            <View style={styles.containerButton}>
                <Button text="Cancelar Reserva" theme="danger" 

                // Ao clicar no botão, passa para o onPress o id_appointment para ele saber qual reserva apagar, conforme na abacalendar
                onPress={() => props.onPress(props.id_appointment)} />
            </View>

        </View>

    </View>

}

export default Appointment;