/*
    * Arquivo de Toast
    ----------------------------------------------------------------------------------------------------------
*/

// Importação do toast do react-toastify
import { toast } from 'react-toastify';

// Toast de sucesso
export const toastSuccess = (message) => toast.success(message);

// Toast de erro
export const toastError = (message) => toast.error(message);