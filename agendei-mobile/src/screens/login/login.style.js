/**
 * * CSS da Tela de Login
 */

// Importações do theme.js
import { COLORS, FONT_SIZE } from "../../constants/theme.js";

export const styles = {

    // Container contendo as 3 views da tela de Login
    container: {
        backgroundColor: COLORS.white,
        flex: 1,
        padding: 50,
        justifyContent: "space-between",
    },

    // Container contendo a logo do projeto
    containerLogo: {
        alignItems: "center"
    },

    // Logo
    logo: {
        width: 100,
        height: 23,
    },

    // Container dos inputs
    containerInput: {
        marginBottom: 15
    },

    // Input (e-mail e senha)
    input: {
        backgroundColor: COLORS.gray5,
        padding: 10,
        borderRadius: 6,
    },

    // Footer
    footer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },

    // Texto do footer
    footerText: {
        color: COLORS.gray3,
    },

    // Link do footer
    footerLink: {
        color: COLORS.blue,
    }

}