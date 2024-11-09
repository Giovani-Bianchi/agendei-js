/**
 * * CSS do Botão
*/

// Importando as cores e font sizes do arquivo de theme.js
import { COLORS, FONT_SIZE } from "../../constants/theme.js";

export const styles = {

    btn: {
        width: "100%",
        borderRadius: 6,
        padding: 12
    },

    primary: {
        backgroundColor: COLORS.blue
    },

    danger: {
        backgroundColor: COLORS.red
    },

    text: {
        color: "#FFF",
        fontSize: FONT_SIZE.md,
        textAlign: "center"
    }

}