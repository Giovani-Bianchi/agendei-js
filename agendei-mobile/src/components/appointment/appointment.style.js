/**
 * * CSS do componente de Consultas Marcadas
 */

// Importações do theme.js
import { COLORS, FONT_SIZE } from "../../constants/theme.js";

export const styles = {

    // Box da consulta marcada
    appointment: {
        flex: 1,
        backgroundColor: COLORS.white,
        padding: 18,
        borderWidth: 0.5,
        borderColor: COLORS.gray2
    },

    // Serviço e nome do médico
    name: {
        fontSize: FONT_SIZE.md,
        color: COLORS.gray1,
        marginBottom: 2
    },

    // Especialidade
    specialty: {
        fontSize: FONT_SIZE.sm,
        color: COLORS.gray3,
        marginBottom: 4
    },

    // Ícone
    icon: {
        width: 25,
        height: 25,
        marginRight: 5,
        marginBottom: 3
    },

    // Texto da data
    bookingDate: {
        fontSize: FONT_SIZE.sm,
        color: COLORS.gray3,
        marginTop: 3
    },

    // Texto de horário
    bookingHour: {
        fontSize: FONT_SIZE.sm,
        color: COLORS.gray3,
        marginTop: 3
    },

    // Box Data/horário
    booking: {
        flexDirection: 'row',
    },

    // Container de Horário/Data
    containerBooking: {
        flex: 1
    },
    
    // Container do Botão
    containerButton: {
        width: "50%",
        marginTop: 5
    },

    // Container
    container: {
        flexDirection: "row"
    }

}