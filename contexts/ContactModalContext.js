import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';

const ContactModal = dynamic(() => import('../components/ContactModal'), { ssr: false });

const ContactModalContext = createContext(null);

export function ContactModalProvider({ children }) {
    const [open, setOpen] = useState(false);
    const openContactModal = useCallback(() => setOpen(true), []);
    const closeContactModal = useCallback(() => setOpen(false), []);

    const value = useMemo(
        () => ({ openContactModal, closeContactModal, isContactModalOpen: open }),
        [open, openContactModal, closeContactModal],
    );

    return (
        <ContactModalContext.Provider value={value}>
            {children}
            {open && <ContactModal closeModal={closeContactModal} />}
        </ContactModalContext.Provider>
    );
}

export function useContactModal() {
    const ctx = useContext(ContactModalContext);
    if (!ctx) {
        return {
            openContactModal: () => {},
            closeContactModal: () => {},
            isContactModalOpen: false,
        };
    }
    return ctx;
}
