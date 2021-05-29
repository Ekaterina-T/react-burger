import React from 'react';
import ReactDOM from 'react-dom';
import styles from './modal.module.css';
import {CloseIcon}  from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay';
import PropTypes from 'prop-types';

const Modal = (props) => {

    const { children, onClose } = props;
    const modalRoot = document.querySelector("#modals");
  
    return ReactDOM.createPortal(
        (
            <>
                <article className={styles.modal}>
                    <div className={styles.close_btn}><CloseIcon onClick={onClose}/></div>
                    {children}
                </article>
                <ModalOverlay onClose={onClose}/>
            </>
        ), 
        modalRoot
    );

} 

export default Modal

Modal.propTypes = {
  onClose: PropTypes.func
};

