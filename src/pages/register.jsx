import React from 'react';
import { Link } from 'react-router-dom';
import {Input, EmailInput, PasswordInput, Button} from '@ya.praktikum/react-developer-burger-ui-components';

import AppForm from '../components/app-form/app-form';
import {registerUrl} from '../utils/constants';

import styles from './index.module.css';

function RegisterPage() {

    const [name, setName] = React.useState(''); 
    const [email, setEmail] = React.useState(''); 
    const [password, setPassword] = React.useState(''); 

    const onChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        switch(name) {
            case 'name':
                setName(value);
                return;
            case 'email':
                setEmail(value);
                return;
            case 'password':
                setPassword(value);
                return;
            default:
                throw new Error('Attempt to set not existing field in RegisterPage');            
        }
    }

    const register = (e) => {
        e.preventDefault();

        fetch(registerUrl, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "email": email, 
                "password": password, 
                "name": name 
            } )
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
        <AppForm title='Регистрация' >
            <div className={styles.input}><Input type="text" onChange={onChange} name={'name'} placeholder={'Имя'} value={name}/></div>
            <div className={styles.input}><EmailInput onChange={onChange} name={'email'} /></div>
            <div className={styles.input}><PasswordInput onChange={onChange} name={'password'} /></div>
            <div className={styles.button}><Button onClick={register}>Зарегистрироваться</Button ></div>

            <p className={styles.helpRedirect}>
                Уже зарегистрированы?
                <Link to='/login' className={styles.link}>Войти</Link> 
            </p>

        </AppForm>
    );
}

export default RegisterPage;
