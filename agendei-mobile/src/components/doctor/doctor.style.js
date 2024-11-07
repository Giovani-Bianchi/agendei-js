/**
 * * CSS do componente de Médico
 */

// Importações do theme.js
import { COLORS, FONT_SIZE } from "../../constants/theme.js";

export const styles = {

    // Box do médico
    doctor: {
        flex: 1,
        backgroundColor: COLORS.white,
        paddingTop: 12,
        paddingBottom: 12,
        paddingLeft: 15,
        flexDirection: "row",
        borderWidth: 1,
        borderColor: COLORS.gray4,
        marginTop: 6,
        marginBottom: 6,
        borderRadius: 6
    },

    // Nome do médico
    name: {
        fontSize: FONT_SIZE.md,
        color: COLORS.gray1,
        marginTop: 3
    },

    // Especialidade do médico
    specialty: {
        fontSize: FONT_SIZE.sm,
        color: COLORS.gray3
    },

    // Ícone do médico
    icon: {
        width: 50,
        height: 50,
        marginRight: 10
    }

}