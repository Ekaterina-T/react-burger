import React from 'react';
import { Link } from 'react-router-dom';
import {PasswordInput, Input, Button} from '@ya.praktikum/react-developer-burger-ui-components';

import AppForm from '../components/app-form/app-form';
import {resetUrl} from '../utils/constants';

import styles from './index.module.css';

function ResetPasswordPage() {

    const [password, setPassword] = React.useState(null);
    const [verificationToken, setVerificationToken] = React.useState('');

    const onChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        switch(name) {
            case 'password': 
                setPassword(value); 
                return;
            case 'verificationToken': 
                setVerificationToken(value);
                return;
            default:
                throw new Error('Attempt to update not existing field in ResetPasswordPage');
        }
    }

    const resetPassword = (e) => {
        e.preventDefault();

        fetch(resetUrl, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "password": password,
                "token": verificationToken
            })
        })
        .then(res => res.ok ? res.json() : Promise.reject(res))
        .then(res => {
            //TODO: redirect to login
            console.log(res);
        })
        .catch( res => {
            //TODO: error handling
            console.log(res);
        });
    }

    return (
        <AppForm title='Восстановление пароля' >
            <div className={styles.input}>
                <PasswordInput onChange={onChange} name={'password'} />
            </div>
            <div className={styles.input}>
                <Input
                type="text" 
                onChange={onChange} 
                name={'verificationToken'} 
                placeholder={'Введите код из письма'} 
                value={verificationToken}/>
            </div>
            <div className={styles.button}>
                <Button onClick={resetPassword}>Сохранить</Button >
            </div>

            <p className={styles.helpRedirect}>
                Вспомнили пароль? 
                <Link to='/login' className={styles.link}>Войти</Link> 
            </p>

        </AppForm>
    );
}

export default ResetPasswordPage;
