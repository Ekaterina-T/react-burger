import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import {Input, EmailInput, PasswordInput, Button} from '@ya.praktikum/react-developer-burger-ui-components';

import AppForm from '../components/app-form/app-form';
import {register} from '../services/user/actions';

import styles from './index.module.css';

function RegisterPage() {

    const dispatch = useDispatch();
    const {registerSuccess} = useSelector(store => store.user); 
    let history = useHistory();   

    const name = React.useRef(); 
    const email = React.useRef(); 
    const password = React.useRef(); 

    React.useEffect( () => {

        if(registerSuccess) {
            history.push('/login');
        }
        
    }, [history, registerSuccess]);


    const handleRegistration = (e) => {
        e.preventDefault();
        const emailVal = email.current.querySelector('input').value;
        const passwordVal = password.current.querySelector('input').value;
        const nameVal = name.current.querySelector('input').value;
        dispatch(register(emailVal, passwordVal, nameVal));
    }

    return (
        <AppForm title='Регистрация' >
            <div className={styles.input} ref={name}><Input type="text" name={'name'} placeholder={'Имя'}/></div>
            <div className={styles.input} ref={email}><EmailInput name={'email'} /></div>
            <div className={styles.input} ref={password}><PasswordInput name={'password'} /></div>
            <div className={styles.button}><Button onClick={handleRegistration}>Зарегистрироваться</Button ></div>

            <p className={styles.helpRedirect}>
                Уже зарегистрированы?
                <Link to='/login' className={styles.link}>Войти</Link> 
            </p>

        </AppForm>
    );
}

export default RegisterPage;
