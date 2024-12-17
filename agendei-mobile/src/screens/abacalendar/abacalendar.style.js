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

    // Texto de empty state
    emptyText: {
        textAlign: "center",
        fontWeight: "bold",
        marginTop: 20,
        paddingTop: 10,

        borderTopWidth: 1,
        borderColor: COLORS.gray2
    }

}