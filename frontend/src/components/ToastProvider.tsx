import { Snackbar } from '@mui/material';
import { createContext, PropsWithChildren, useContext, useState } from 'react'

type ContextType = {
    showToast: (message: string) => void,
};

const ToastContext = createContext<ContextType>({showToast: ()=>{}});

const ToastProvider = ({ children }: PropsWithChildren) => {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const onSnackClose = ()=>{
        setOpen(false);
    };
    const showToast = (message: string) => {
        setMessage(message);
        setOpen(true);
    };
    return (
        <>
            <ToastContext.Provider value={{showToast}}>
                <Snackbar
                    open={open}
                    autoHideDuration={3000}
                    onClose={onSnackClose}
                    message={message}
                />
                {children}
            </ToastContext.Provider>
        </>
    )
}

export default ToastProvider
export const useToast = ()=> useContext(ToastContext);