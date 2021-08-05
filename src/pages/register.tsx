import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import {Input, EmailInput, PasswordInput, Button} from '@ya.praktikum/react-developer-burger-ui-components';

import AppForm from '../components/app-form/app-form';
import {register} from '../services/user/actions';

import styles from './index.module.css';

import { useAppSelector, useAppDispatch } from '../services/types';

function RegisterPage() {

    const dispatch = useAppDispatch();
    const [registerInfo, setRegisterInfo] = useState({name: '', email: '', password: ''});
    const {registerSuccess} = useAppSelector(store => store.user); 
    let history = useHistory();   

    React.useEffect( () => {

        if(registerSuccess) {
            history.push('/login');
        }
        
    }, [history, registerSuccess]);

    const onChange = (e: React.ChangeEvent) => {
        const elem = e.target as HTMLInputElement;
        setRegisterInfo({...registerInfo, [elem.name]: elem.value});
    }
    
    const handleRegistration = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(register(registerInfo.email, registerInfo.password, registerInfo.name));
    }

    return (
        <AppForm title='Регистрация' onSubmit={handleRegistration}>
            <div className={styles.input}><Input type="text" name={'name'} placeholder={'Имя'} value={registerInfo.name} onChange={onChange}/></div>
            <div className={styles.input}><EmailInput name={'email'} value={registerInfo.email} onChange={onChange}/></div>
            <div className={styles.input}><PasswordInput name={'password'} value={registerInfo.password} onChange={onChange}/></div>
            <div className={styles.button}><Button>Зарегистрироваться</Button ></div>

            <p className={styles.helpRedirect}>
                Уже зарегистрированы?
                <Link to='/login' className={styles.link}>Войти</Link> 
            </p>

        </AppForm>
    );
}

export default RegisterPage;
