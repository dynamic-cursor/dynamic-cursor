import { motion } from 'framer-motion';
import React from 'react';

interface ModalContextValue {
    whichModalOn: string | null;
    openModal : (modal: string, props? : unknown) => void;
    closeModal: () => void;
}

const ModalContext = React.createContext<ModalContextValue>({
    whichModalOn: null,
    openModal: () => {},
    closeModal: () => {},
});

interface Props {
    children: React.ReactNode;
    modals?: {
        [key: string]: (props: unknown) => React.ReactNode;
    }
}

const ModalProvider = ({ children, modals = {} }: Props) => {

    const [whichModalOn, setWhichModalOn] = React.useState<string | null>(null);
    const [modalProps, setModalProps] = React.useState<unknown>(null);

    const openModal = (modal: string, props?: unknown) => {
        setWhichModalOn(modal);
        setModalProps(props);
    }

    const closeModal = () => {
        setWhichModalOn(null);
        setModalProps(null);
    }

    React.useEffect(() => {
        if (whichModalOn) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [whichModalOn])

    return (
        <ModalContext.Provider value={{ whichModalOn, openModal, closeModal }}>
            {children}
            
            {whichModalOn && (
                <div style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100vw",
                    height: "100vh",
                    background: "rgba(0, 0, 0, 0.5)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    zIndex: 1000,
                }}>
                    <motion.div layout layoutId="cursor" className="dynamic-modal">
                        {modals[whichModalOn](modalProps)}
                    </motion.div>
                </div>
            )}
        </ModalContext.Provider>
    )

}