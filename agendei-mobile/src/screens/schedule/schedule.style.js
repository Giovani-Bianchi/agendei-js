/**
 * * CSS da Tela de Agendamento de Horários para a Consulta
 */

// Importações do theme.js
import { COLORS, FONT_SIZE } from "../../constants/theme.js";

export const styles = {

    // Container principal da Tela de Schedule
    container: {
        flex: 1,
        justifyContent: "space-between",
        backgroundColor: COLORS.white,
        paddingLeft: 20,
        paddingRight: 20,
        marginBottom: 20
    },

    // Tema do Calendário
    theme: {
        todayTextColor: COLORS.blue,
        selectedDayBackgroundColor: COLORS.blue,
        selectedDayTextClor: COLORS.white,
        arrowColor: COLORS.gray1
    },

    // Texto do Horário
    textHour: {
        fontSize: FONT_SIZE.lg,
        fontWeight: "bold",
        color: COLORS.gray2,
        marginTop: 20
    }

}