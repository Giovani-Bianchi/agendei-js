/**
 * * Aba Calendar
 */

// Importando os estilos
import { styles } from './abacalendar.style.js';

// Importações dos componentes
import Appointment from '../../components/appointment/appointment.jsx';

// Importações do react-native
import { Alert, FlatList, View } from "react-native";

// Importações do react
import { useEffect, useState } from 'react';

// Importação da API
import api from '../../constants/api.js';

function AbaCalendar() {

    // Criando uma variável de estado para a lista de reservas
    const [ appointments, setAppointments ] = useState([]);

    // Criar a requisição para fazer o GET na rota /appointments
    async function LoadAppointments() {

        // Bloco para tratar erro com try catch
        try {

            // Constante de response para fazer uma requisição para a API com o método GET na rota /appointments. Não é necessário passar o id do usuário aqui para pegar todas as reservas pois esse id já está configurado e vindo quando usamos o api.
            const response = await api.get("/appointments");

            // Se a requisição foi bem sucedida, passa o response com os dados das reservas para a função setAppointments popular a variável appointments
            if (response.data) {
                setAppointments(response.data);
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

    // Criar a requisição para fazer o DELETE na rota /appointments/{id}. Passa o ID para saber qual reserva deletar
    async function DeleteAppointment(id_appointment) {

        // Bloco para tratar erro com try catch
        try {

            // Constante de response para fazer uma requisição para a API com o método DELETE na rota /appointments/{id}
            const response = await api.delete("/appointments/" + id_appointment);

            // Se a requisição foi bem sucedida, recarrega novamente a lista de reservas
            if (response.data?.id_appointment) {
                LoadAppointments();
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

    // Usando o hooker de useEffect para executar o LoadAppointments quando o componente for carregado.
    useEffect(() => {
        LoadAppointments();
    }, []);

    return <View style={styles.container}>

        {/* Lista de consultas marcadas no calendário */}
        <FlatList data={appointments} keyExtractor={(appoint) => appoint.id_appointment} showsVerticalScrollIndicator={false} renderItem={({item}) => {
            return <Appointment  id_appointment={item.id_appointment}
            doctor={item.doctor} 
            service={item.service} 
            specialty={item.specialty}
            bookingDate={item.booking_date}
            bookingHour={item.booking_hour}
            
            // Ao pressionar o botão,  chama a função DeleteAppointment com o ID da reserva
            onPress={DeleteAppointment}
            />
        }} />

    </View>

}

export default AbaCalendar;