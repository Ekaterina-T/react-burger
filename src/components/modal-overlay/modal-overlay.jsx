import React from 'react';
import styles from './modal-overlay.module.css';
import PropTypes from 'prop-types';

class ModalOverlay extends React.Component {

  render() {

    const {onClose} = this.props;
  
    return (
        <div className={styles.backdrop} onClick={onClose}></div>
    );

  }
} 

export default ModalOverlay

ModalOverlay.propTypes = {
  onClose: PropTypes.func
};
