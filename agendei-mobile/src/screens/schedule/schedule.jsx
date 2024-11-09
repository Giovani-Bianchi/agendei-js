/**
 * * Tela de Agendamento de Horários para a Consulta
 * 
 * * Projeto Calendário: https://github.com/wix/react-native-calendars
 * * Projeto Picker: https://github.com/react-native-picker/picker
 */

// Importando os estilos
import { styles } from "./schedule.style.js";

// Importação dos Componentes
import Button from  "../../components/button/button.jsx";

// Importando o arquivo de tradução do calendário com os arrays
import { ptBR } from "../../constants/calendar.js";

// Importações do react-native
import { Alert, Text, View } from "react-native";

// Importações do react
import { useState } from "react";

// Importações do react-native-calendars - LocaleConfig carrega um arquivo de configuração para traduzir o calendário, por padrão vem em inglês
import { Calendar, LocaleConfig } from "react-native-calendars";

// Importações do react-native-picker
import { Picker } from "@react-native-picker/picker";

// Importação da API
import api from '../../constants/api.js';

// Usando o LocaleConfig para habilitar a tradução
LocaleConfig.locales["pt-br"] = ptBR;
LocaleConfig.defaultLocale = "pt-br";

function Schedule(props) {

    // Declarando as variáveis para poder mostras as informações dinamicamente, isso foi recebido ao clicar no serviço e executar a função
    const id_doctor = props.route.params.id_doctor;
    const id_service = props.route.params.id_service;

    // Estado para armazenar a data selecionada, inicia com a data de hoje selecionada, corta o valor trazido só para os primeiros 10 caracteres, que é a data em si
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 10));

    //  Estado para armazenar a hora selecionada
    const [selectedHour, setSelectedHour] = useState("");

    // Criar a requisição para fazer o POST na rota /appointments
    async function ClickBooking() {

        // Bloco para tratar erro com try catch
        try {

            // Constante de response para fazer uma requisição para a API com o método POST na rota /appointments
            const response = await api.post("/appointments", {
                id_doctor, // Aqui não precisa passar para uma variável pois o nome da variável é igual ao nome da chave, assim como no id_service
                id_service,
                booking_date: selectedDate, // Aqui precisa
                booking_hour: selectedHour // Aqui precisa
            });

            // Se a requisição foi bem sucedida e existe um id da reserva, então irá voltar o usuário para a tela de home. O popToTop() volta todas as telas que foram abertas uma por cima da outra, ou seja, volta para a tela de home
            if (response.data?.id_appointment) {
                props.navigation.popToTop();
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

    return <View style={styles.container}>

        {/* View para manter o conteúdo da tela dividido em duas seções (Calendário/horário e na outra seção o Botão) */}
        <View>

            {/* Calendário */}
            <Calendar 
            theme={styles.theme} 
            onDayPress={(day) => {
                /* Ao pressionar algum dia no calendário, irá pegar pelo objeto 'day' que contém vários valores 
                mas vai extrair apenas o dia em formato string e jogar para a variável de estado 'selected' */
                setSelectedDate(day.dateString)
            }} 
            // Ao mudar o conteúdo da variável clicando em algum dia, ele entende que é necessário renderizar de novo com o dia marcado
            markedDates={{
                [selectedDate]: {selected: true}
            }}
            // Instanciando uma nova data e pegando a data de hoje e elegendo como a data mínima
            minDate={new Date().toDateString()}
            />

            {/* Texto de Horário */}
            <View>
                <Text style={styles.textHour}>Horário</Text>
            </View>

            {/* Picker de Horário */}
            <View>
                <Picker 
                    selectedValue={selectedHour} 
                    // Na mudança do valor do picker, irá atualizar a variável de estado 'selectedHour', atualizando a visualização do horário selecionado
                    onValueChange={(itemValue) => {
                        setSelectedHour(itemValue)
                    }} >
                    {/* Listagem de opções de horário */}
                    <Picker.Item label="09:00" value="09:00" />
                    <Picker.Item label="09:30" value="09:30" />
                    <Picker.Item label="10:00" value="10:00" />
                </Picker>
            </View>

        </View>

        {/* Botão de Confirmar Reserva */}
        <View>
            <Button text="Confirmar Reserva" onPress={ClickBooking} />
        </View>

    </View>

}

export default Schedule;