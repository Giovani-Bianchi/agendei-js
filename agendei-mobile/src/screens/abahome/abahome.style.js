/**
 * * CSS da Aba Home
 */

// Importações do theme.js
import { COLORS, FONT_SIZE } from "../../constants/theme.js";

export const styles = {

    // Container principal da AbaHome
    container: {
        backgroundColor: COLORS.white,
        flex: 1,
        padding: 20
    },

    // Texto da AbaHome
    text: {
        fontSize: FONT_SIZE.md,
        color: COLORS.gray1,
        marginBottom: 15,
        marginLeft: 10
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