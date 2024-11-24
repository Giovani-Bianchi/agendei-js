/*
    * Arquivo de Estilos do Componente de Register
    ----------------------------------------------------------------------------------------------------------
*/

// Importação do styled-components
import styled from 'styled-components';

/* --------------------------------------------------------------------------------------------------------
 * Form
---------------------------------------------------------------------------------------------------------- */

// Form
export const Form = styled.form`
    width: 400px;
    padding: 15px;
`;

// Logo
export const Logo = styled.img.attrs({
   className: 'mb-4' 
})`
    width: 170px;
`;

/* --------------------------------------------------------------------------------------------------------
 * Imagem
---------------------------------------------------------------------------------------------------------- */

// Imagem do Médico
export const DoctorImage = styled.img`
    object-fit: cover;
    object-position: left;

    width: 100%;
    height: 100vh;
`;