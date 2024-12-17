/**
 * * CSS do Componente de Service contendo a estrutura do serviço dos médicos
 */

// Importações do theme.js
import { COLORS, FONT_SIZE } from "../../constants/theme.js";

export const styles = {

    // Serviço do componente de serviço
    service: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: COLORS.white,
        padding: 12,
        borderWidth: 1,
        borderColor: COLORS.gray4
    },

    // Container de texto
    containerText: {
        flex: 1
    },

    // Container do botão
    containerButton: {
        width: "30%",
        marginTop: 5
    },

    // Descrição
    description: {
        fontSize: FONT_SIZE.md,
        color: COLORS.gray3,
        marginTop: 5
    },

    // Preço
    price: {
        fontSize: FONT_SIZE.sm,
        color: COLORS.blue,
        marginTop: 3
    },

}