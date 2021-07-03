import React from 'react';
import { Link } from 'react-router-dom';
import {EmailInput, PasswordInput, Button} from '@ya.praktikum/react-developer-burger-ui-components';

import AppForm from '../components/app-form/app-form';

import styles from './index.module.css';

function LoginPage() {

    const onChange = (e) => {
        console.log(e.target);
    }

    const handleLogin = (e) => {
        e.preventDefault();
        console.log(e.target);
    }

    return (
        <AppForm title='Вход' >
            <div className={styles.input}><EmailInput onChange={onChange} name={'email'} /></div>
            <div className={styles.input}><PasswordInput onChange={onChange} name={'password'} /></div>
            <div className={styles.button}><Button onClick={handleLogin}>Войти</Button ></div>

            <p className={styles.helpRedirect}>
                Вы новый пользователь? 
                <Link to='/register' className={styles.link}>Зарегистрироваться</Link> 
            </p>

            <p className={styles.helpRedirect}>
                Забыли пароль? 
                <Link to='/forgot-password' className={styles.link}>Восстановить пароль</Link>
            </p>

        </AppForm>
    );
}

export default LoginPage;
