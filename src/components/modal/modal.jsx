import React from 'react';
import ReactDOM from 'react-dom';
import styles from './modal.module.css';
import {CloseIcon}  from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay';
import PropTypes from 'prop-types';

const Modal = (props) => {

    const { children, onClose, type, modalComponent} = props;
    const modalRoot = document.querySelector("#modals");

    React.useEffect(() => {
            modalComponent.current.focus();
        }
    );

    const onEscape = (e) => {
        if(e.code === "Escape") {
            onClose(e);
        }
    }
  
    return ReactDOM.createPortal(
        (
            <>
                <article className={styles.modal} tabIndex={0} ref={modalComponent} onKeyDown={onEscape}>
                    <div className={styles["close_btn_"+type]}><CloseIcon onClick={onClose}/></div>
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
  onClose: PropTypes.func,
  type: PropTypes.oneOf(["ingredient", "order"])
};

