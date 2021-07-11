import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import {PasswordInput, Input, Button} from '@ya.praktikum/react-developer-burger-ui-components';

import AppForm from '../components/app-form/app-form';
import { resetPassword } from '../services/user/actions';

import styles from './index.module.css';

function ResetPasswordPage() {

    const history = useHistory();
    const dispatch = useDispatch();
    const { passwordResetCodeSuccess, passwordResetSuccess } = useSelector(store => store.user);
    const [resetData, setResetData] = React.useState({password: null, verificationToken: ''});

    React.useEffect( () => {
        if(!passwordResetCodeSuccess) {
            history.replace({pathname: './forgot-password'});
        } else if(passwordResetSuccess) {
            history.replace({pathname: './login'});
        }

    }, 
    [passwordResetCodeSuccess, passwordResetSuccess,  history]);

    const onChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setResetData({...resetData, [name]: value});
    }

    const handleResetPassword = (e) => {
        e.preventDefault();
        dispatch(resetPassword(resetData.password, resetData.verificationToken));
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
                value={resetData.verificationToken}/>
            </div>
            <div className={styles.button}>
                <Button onClick={handleResetPassword}>Сохранить</Button >
            </div>

            <p className={styles.helpRedirect}>
                Вспомнили пароль? 
                <Link to='/login' className={styles.link}>Войти</Link> 
            </p>

        </AppForm>
    );
}

export default ResetPasswordPage;