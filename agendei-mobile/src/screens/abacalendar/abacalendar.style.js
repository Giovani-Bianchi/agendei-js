/**
 * * CSS da Aba Calendar
 */

// Importações do theme.js
import { COLORS, FONT_SIZE } from "../../constants/theme.js";

export const styles = {

    // Container principal da AbaCalendar
    container: {
        backgroundColor: COLORS.white,
        flex: 1,
    },

    // Texto da AbaCalendar
    text: {
        fontSize: FONT_SIZE.md,
        color: COLORS.gray1,
        marginBottom: 15,
        marginLeft: 10
    },

}