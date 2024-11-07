/**
 * * CSS da Aba Profile
 */

// Importações do theme.js
import { COLORS, FONT_SIZE } from "../../constants/theme.js";

export const styles = {

    // Container principal da AbaProfile
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
        paddingTop: 12
    },

    // Item
    item: {
        borderWidth: 1,
        borderColor: COLORS.gray4,
        paddingLeft: 16,
        paddingTop: 20,
        paddingBottom: 20
    },

    // Título do item
    title: {
        fontSize: FONT_SIZE.sm,
        color: COLORS.gray3,
        marginBottom: 6
    },

    // Texto do item
    text: {
        fontSize: FONT_SIZE.md,
        color: COLORS.gray1,
    },

    // Botão de Logout
    button: {
        padding: 18
    }

}