import React from 'react';
import styles from './modal-overlay.module.css';
import PropTypes from 'prop-types';

const ModalOverlay = ({onClose}) => {

    return (
        <div className={styles.backdrop} onClick={onClose}></div>
    );

} 

export default ModalOverlay

ModalOverlay.propTypes = {
  onClose: PropTypes.func.isRequired
};
