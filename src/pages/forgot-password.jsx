import React from 'react';
import { Link } from 'react-router-dom';
import {Input, Button} from '@ya.praktikum/react-developer-burger-ui-components';

import AppForm from '../components/app-form/app-form';
import { passwordResetUrl } from '../utils/constants';

import styles from './index.module.css';

function ForgotPasswordPage() {

    const [email, setEmail] = React.useState('');

    const onEmailUpdate = (e) => {
        setEmail(e.target.value);
    };

    const restorePwd = (e) => {
        e.preventDefault();

        fetch(passwordResetUrl, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"email": email})
        })
        .then(res => res.ok ? res.json() : Promise.reject(res))
        .then(res => {
            //TODO: redirect to reset-password
            console.log(res);
        })
        .catch( res => {
            //TODO: error handling
            console.log(res);
        });
    };

    return (
        <AppForm title='Восстановление пароля' >
            <div className={styles.input}>
                <Input 
                type = "email"
                name={'email'} 
                placeholder={'Укажите e-mail'} 
                onChange={onEmailUpdate}
                value={email} />
            </div>
            <div className={styles.button}>
                <Button onClick={restorePwd}>Восстановить</Button >
            </div>

            <p className={styles.helpRedirect}>
                Вспомнили пароль? 
                <Link to='/login' className={styles.link}>Войти</Link> 
            </p>

        </AppForm>
    );
}

export default ForgotPasswordPage;
