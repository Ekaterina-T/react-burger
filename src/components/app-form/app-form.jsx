import React, { useMemo } from 'react';
import styles from './app-form.module.css';
import PropTypes from 'prop-types';

function AppForm ({children, title, additionalStyles}) {

    const getFormStyles = useMemo( () => {

        const defaultStyles = [styles['centeredForm']];
        return additionalStyles ? defaultStyles.concat( additionalStyles.map( style => styles[style]) ) : defaultStyles;
    },
    [additionalStyles]);


    return (
        <form className={getFormStyles.join(' ')}>

            { title && <header>  <h2 className={styles.title}>{title}</h2> </header> }

            {children}

        </form>
    );

}

export default AppForm;

AppForm.protoTypes = {
    title: PropTypes.string,
    additionalStyles: PropTypes.array
}