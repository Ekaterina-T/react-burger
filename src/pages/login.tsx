import React from 'react';
import { Link } from 'react-router-dom';
import { EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import AppForm from '../components/app-form/app-form';
import { login } from '../services/user/actions';
import styles from './index.module.css';

import { useAppDispatch } from '../services/types';

function LoginPage() {
  const dispatch = useAppDispatch();
  const [credentials, setCredentials] = React.useState({ email: '', password: '' });

  const onInputChange = (e: React.ChangeEvent) => {
    const { name } = e.target as HTMLInputElement;
    const { value } = e.target as HTMLInputElement;
    setCredentials((prevVal) => ({ ...prevVal, [name]: value }));
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(login(credentials.email, credentials.password));
  };

  return (
    <AppForm title="Вход" onSubmit={handleLogin}>
      <div className={styles.input}>
        <EmailInput name="email" value={credentials.email} onChange={onInputChange} />
      </div>
      <div className={styles.input}>
        <PasswordInput name="password" value={credentials.password} onChange={onInputChange} />
      </div>
      <div className={styles.button}><Button>Войти</Button></div>

      <p className={styles.helpRedirect}>
        Вы новый пользователь?
        <Link to="/register" className={styles.link}>Зарегистрироваться</Link>
      </p>

      <p className={styles.helpRedirect}>
        Забыли пароль?
        <Link to="/forgot-password" className={styles.link}>Восстановить пароль</Link>
      </p>

    </AppForm>
  );
}

export default LoginPage;
