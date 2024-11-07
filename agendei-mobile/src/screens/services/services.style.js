/**
 * * CSS da Tela de Services
 */

// Importações do theme.js
import { COLORS, FONT_SIZE } from "../../constants/theme.js";

export const styles = {

    // Container principal de Tela de Services
    container: {
        flex: 1,
        backgroundColor: COLORS.white
    },

    // Banner do médico
    banner: {
        backgroundColor: COLORS.blue,
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 10,
        paddingBottom: 25
    },

    // Nome do médico
    name: {
        fontSize: FONT_SIZE.md,
        color: COLORS.white,
        fontWeight: "bold",
        marginTop: 5
    },

    // Epecialidade do médico
    specialty: {
        fontSize: FONT_SIZE.sm,
        color: COLORS.white,
        marginTop: 3
    },

}