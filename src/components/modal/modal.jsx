/*
import React from 'react';
import ReactDOM from 'react-dom';
import styles from './modal.module.css';



class Modal extends React.Component {

  render() {
    const { children, header, onClose } = this.props;
  
    return ReactDOM.createPortal(
        (
            <>
                <div className={styles.modal}>
                    <header onClose={onClose}>{header}</header>
                    {children}
                </div>
                <div onClose={onClose}> </div>
            </>
        ), 
        modalRoot
    );
  }
} 

export default Modal
*/