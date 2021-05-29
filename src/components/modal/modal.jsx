import React from 'react';
import ReactDOM from 'react-dom';
import styles from './modal.module.css';
import {CloseIcon}  from '@ya.praktikum/react-developer-burger-ui-components';

class Modal extends React.Component {

  render() {
    const { children, onClose } = this.props;

    const modalRoot = document.querySelector("#modals");
  
    return ReactDOM.createPortal(
        (
            <>
                <div className={styles.modal}>
                    <div className={styles.close_btn}><CloseIcon onClick={onClose}/></div>
                    {children}
                </div>
                <div className={styles.backdrop} onClick={onClose}> </div>
            </>
        ), 
        modalRoot
    );
  }
} 

export default Modal
