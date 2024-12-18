/*
    * Arquivo de Estilos do Componente de Services do Doctor
    ----------------------------------------------------------------------------------------------------------
*/

// Importação do styled-components
import styled from 'styled-components';

// Importação do Link do react-router-dom
import { Link } from "react-router-dom";

/* --------------------------------------------------------------------------------------------------------
 * Top Section
---------------------------------------------------------------------------------------------------------- */

// Link de voltar a página
export const StyledLink = styled(Link) `
    height: fit-content;
`;

/* --------------------------------------------------------------------------------------------------------
 * Table
---------------------------------------------------------------------------------------------------------- */

// Coluna de Botões
export const ThButtons = styled.th`
    width: 120px;
`;