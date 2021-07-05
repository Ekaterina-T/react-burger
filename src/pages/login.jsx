import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import {EmailInput, PasswordInput, Button} from '@ya.praktikum/react-developer-burger-ui-components';

import AppForm from '../components/app-form/app-form';
import {login} from '../services/user/actions';

import styles from './index.module.css';

function LoginPage() {

    const dispatch = useDispatch();
    const {loginSuccess} = useSelector(store => store.user);
    let history = useHistory();

    const email = React.useRef(); 
    const password = React.useRef(); 

    React.useEffect( () => {

        if(loginSuccess) {
            history.push('/');
        }
        
    }, [history, loginSuccess]);

    const handleLogin = (e) => {
        e.preventDefault();    
        const emailVal = email.current.querySelector('input').value;
        const passwordVal = password.current.querySelector('input').value;    
        dispatch(login(emailVal, passwordVal));
    }

    return (
        <AppForm title='Вход' >
            <div className={styles.input} ref={email}><EmailInput name={'email'} /></div>
            <div className={styles.input} ref={password}><PasswordInput name={'password'} /></div>
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
