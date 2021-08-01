import React, {FC} from 'react';
import styles from './modal-overlay.module.css';
import PropTypes from 'prop-types';

interface IModalOverlayProps {
  onClose: (e: React.MouseEvent | React.KeyboardEvent) => any;
}

const ModalOverlay: FC<IModalOverlayProps> = ({onClose}) => {

    return (
        <div className={styles.backdrop} onClick={onClose}></div>
    );

} 

export default ModalOverlay

ModalOverlay.propTypes = {
  onClose: PropTypes.func.isRequired
};
