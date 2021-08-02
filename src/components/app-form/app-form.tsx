import React, { FC, useMemo } from 'react';
import styles from './app-form.module.css';

interface IAppForm {
    title?: string,
    onSubmit?: (e: React.FormEvent) => any,
    additionalStyles?: string[]
}

const AppForm:FC<IAppForm> = ({children, title, onSubmit, additionalStyles}) => {

    const getFormStyles = useMemo( () => {

        const defaultStyles = [styles['centeredForm']];
        return additionalStyles ? defaultStyles.concat( additionalStyles.map( style => styles[style]) ) : defaultStyles;
    },
    [additionalStyles]);


    return (
        <form className={getFormStyles.join(' ')} onSubmit={onSubmit}>

            { title && <header>  <h2 className={styles.title}>{title}</h2> </header> }

            {children}

        </form>
    );

}

export default AppForm;