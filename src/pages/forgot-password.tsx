import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import AppForm from '../components/app-form/app-form';
import { requestPasswordResetCode } from '../services/user/actions';

import styles from './index.module.css';

import { useAppSelector, useAppDispatch } from '../services/types';

function ForgotPasswordPage(): React.ReactElement | null {
  const dispatch = useAppDispatch();
  const { passwordResetCodeSuccess } = useAppSelector((store) => store.user);
  const history = useHistory();
  const [email, setEmail] = React.useState('');

  React.useEffect(() => {
    if (passwordResetCodeSuccess) {
      history.replace({ pathname: '/reset-password' });
    }
  }, [passwordResetCodeSuccess, history]);

  const onEmailUpdate = (e: React.SyntheticEvent) => {
    setEmail((e.target as HTMLInputElement).value);
  };

  const handleRestoreEmail = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(requestPasswordResetCode(email));
  };

  return (
    <AppForm title="Восстановление пароля" onSubmit={handleRestoreEmail}>
      <div className={styles.input}>
        <Input
          type="email"
          name="email"
          placeholder="Укажите e-mail"
          onChange={onEmailUpdate}
          value={email}
        />
      </div>
      <div className={styles.button}>
        <Button>Восстановить</Button>
      </div>

      <p className={styles.helpRedirect}>
        Вспомнили пароль?
        <Link to="/login" className={styles.link}>Войти</Link>
      </p>

    </AppForm>
  );
}

export default ForgotPasswordPage;
