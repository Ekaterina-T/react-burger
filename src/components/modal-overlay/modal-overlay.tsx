import React from 'react';
import styles from './modal-overlay.module.css';

interface IModalOverlayProps {
  onClose: (e: React.MouseEvent | React.KeyboardEvent) => void;
}

function ModalOverlay({ onClose }: IModalOverlayProps) {
  // eslint-disable-next-line max-len
  // eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events
  return <div className={styles.backdrop} onClick={onClose} />;
}

export default ModalOverlay;
