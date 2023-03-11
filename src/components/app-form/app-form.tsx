import React, { useMemo, ReactElement } from 'react';
import styles from './app-form.module.css';

interface IAppForm {
  children?: any,
  title?: string,
  onSubmit?: (e: React.FormEvent) => void,
  additionalStyles?: string[]
}

function AppForm({
  children, title, onSubmit, additionalStyles,
}: IAppForm): ReactElement {
  const getFormStyles = useMemo(
    () => {
      const defaultStyles = [styles.centeredForm];
      return additionalStyles
        ? defaultStyles.concat(additionalStyles.map((style) => styles[style]))
        : defaultStyles;
    },
    [additionalStyles],
  );

  return (
    <form className={getFormStyles.join(' ')} onSubmit={onSubmit}>

      { title && (
      <header>
        <h2 className={styles.title}>{title}</h2>
      </header>
      ) }

      {children}

    </form>
  );
}

export default AppForm;
