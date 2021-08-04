import React, {FC} from 'react';
import styles from './modal-overlay.module.css';

interface IModalOverlayProps {
  onClose: (e: React.MouseEvent | React.KeyboardEvent) => void;
}

const ModalOverlay: FC<IModalOverlayProps> = ({onClose}) => {

    return (
        <div className={styles.backdrop} onClick={onClose}></div>
    );

} 

export default ModalOverlay
