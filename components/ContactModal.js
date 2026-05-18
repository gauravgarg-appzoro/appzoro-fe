import Modal from 'react-bootstrap/Modal';
import ContactUsBody from './contact/ContactUsBody';
import { FaTimes } from './OptimizedIcons';

const ContactModal = ({ closeModal }) => (
    <Modal
        show
        onHide={closeModal}
        size="xl"
        centered
        aria-labelledby="contact-modal-heading"
        backdropClassName="contact-us-modal-backdrop"
        dialogClassName="contact-us-modal-dialog"
        contentClassName="contact-us-modal-content"
    >
        <Modal.Header className="contact-us-modal-header contact-us-modal-header--with-title border-0">
            <Modal.Title id="contact-modal-heading" as="h2" className="contact-us-modal-screen-title mb-0">
                Contact Us
            </Modal.Title>
            <button
                type="button"
                className="contact-modal-close-btn"
                onClick={closeModal}
                aria-label="Close contact form"
            >
                <FaTimes aria-hidden="true" />
            </button>
        </Modal.Header>
        <Modal.Body className="contact-us-modal-body pt-0 px-0">
            <ContactUsBody variant="modal" onSuccess={closeModal} />
        </Modal.Body>
    </Modal>
);

export default ContactModal;
