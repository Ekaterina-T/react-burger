/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import React, { useState, FC } from 'react';
import ReactDOM from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './modal.module.css';
import ModalOverlay from '../modal-overlay/modal-overlay';

interface IModalProps {
  onClose: (e: React.MouseEvent | React.KeyboardEvent) => void;
  type: 'ingredient' | 'order' | 'orderInfo';
}

const Modal: FC<IModalProps> = ({ children, onClose, type }) => {
  // input for tab trap inside modal
  const [activeBeforeModal, setActiveBeforeModal] = useState<HTMLElement | null>(null);
  const [modalControls, setModalControls] = useState<Array<HTMLElement>>([]);

  const modalComponent = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    setActiveBeforeModal(document.activeElement as HTMLElement);

    if (modalComponent.current) {
      setModalControls([modalComponent.current, modalComponent.current.querySelector('button') as HTMLElement]);
      modalComponent.current.focus();
    }
  }, []);

  const addTabTrap = (e: React.KeyboardEvent) => {
    if (e.code === 'Tab') {
      const { activeElement } = document;

      if (e.shiftKey && activeElement === modalControls[0]) {
        e.preventDefault();
        modalControls[modalControls.length - 1].focus();
      }

      if (activeElement === modalControls[modalControls.length - 1]) {
        e.preventDefault();
        modalControls[0].focus();
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.code === 'Escape' && activeBeforeModal) {
      activeBeforeModal.focus();
      onClose(e);
    }

    addTabTrap(e);
  };

  const modalRoot = document.querySelector('#modals') as Element;

  return ReactDOM.createPortal(
    (
      <>
        <article
          className={styles.modal}
          tabIndex={0}
          ref={modalComponent}
          onKeyDown={handleKeyDown}
        >
          <button type="button" className={styles[`close_btn_${type}`]} onClick={onClose}>
            <CloseIcon type="secondary" />
          </button>
          {children}
        </article>
        <ModalOverlay onClose={onClose} />
      </>
    ),
    modalRoot,
  );
};

export default Modal;
