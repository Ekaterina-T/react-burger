import React, { useMemo } from 'react';
import styles from './app-form.module.css';
import PropTypes from 'prop-types';

function AppForm ({children, title, onSubmit, additionalStyles}) {

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

AppForm.propTypes = {
    title: PropTypes.string,
    onSubmit: PropTypes.func.isRequired,
    additionalStyles: PropTypes.arrayOf(PropTypes.string)
}