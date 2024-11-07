/**
 * * Esse seria o CSS do React, uma função JS com nome de styles que dentro possui as classes de estilização do botão nesse caso
 * * Lembrando que as propriedades do CSS no JS não possui o '-', ao invés disso é usado a letra maiúscula. Exemplo:  background-color -> backgroundColor
 * 
 * * Assim é possível separar os estilos do código
*/

import { COLORS, FONT_SIZE } from "../../constants/theme.js";

export const styles = {

    // Criando uma classe para ao chamar o 'style' no componente, poder chamar esse classe e aplicar esses estilos
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