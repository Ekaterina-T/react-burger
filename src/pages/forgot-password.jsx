import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link , useHistory} from 'react-router-dom';
import {Input, Button} from '@ya.praktikum/react-developer-burger-ui-components';

import AppForm from '../components/app-form/app-form';
import { requestPasswordResetCode } from '../services/user/actions';

import styles from './index.module.css';

function ForgotPasswordPage() {

    const dispatch = useDispatch();
    const { passwordResetCodeSuccess } = useSelector(store => store.user);
    const history = useHistory();
    const [email, setEmail] = React.useState('');

    React.useEffect( () => {
        if(passwordResetCodeSuccess) {
            history.replace({pathname: '/reset-password'});
        }
    }, [passwordResetCodeSuccess, history]);

    const onEmailUpdate = (e) => {
        setEmail(e.target.value);
    };

    const handleRestoreEmail = (e) => {
        e.preventDefault();
        dispatch(requestPasswordResetCode(email));
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
                <Button onClick={ handleRestoreEmail }>Восстановить</Button >
            </div>

            <p className={styles.helpRedirect}>
                Вспомнили пароль? 
                <Link to='/login' className={styles.link}>Войти</Link> 
            </p>

        </AppForm>
    );
}

export default ForgotPasswordPage;
