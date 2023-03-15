import React from 'react';
import styles from './placeholder.module.css';

interface IProps {
  children?: any
}

function Placeholder({ children }: IProps) {
  return <p className={styles.placeholder}>{children}</p>;
}

export default Placeholder;
