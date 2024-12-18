/*
    * Layout Global da Aplicação - Aqui ficará o layout com o que será disponível para todos os componentes
    ----------------------------------------------------------------------------------------------------------
*/

// Importação do react
import React from "react";

// Importando o CSS Global
import "./styles/global.css";

// Importações do react-toastify
import { Slide, ToastContainer } from "react-toastify";

// Importação do CSS ro react-toastify
import 'react-toastify/dist/ReactToastify.css';

const GlobalLayout = ({children}) => {

    return (
        <>
        
            {/* Renderizando as rotas */}
            {children}

            {/* Configuração do Toast Container */}
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                stacked
                transition={Slide}
            />
            
        </>
    )
}

// Exportando o GlobalLayout
export default GlobalLayout;