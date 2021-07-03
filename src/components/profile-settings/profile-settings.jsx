import React from 'react';
import {EmailInput, PasswordInput, Input} from '@ya.praktikum/react-developer-burger-ui-components';

//TODO: fix style link
import styles from '../../pages/index.module.css'

function ProfileSettings() {    

    return (
        <>
            <div className={styles.input}><Input type="text" name={'name'} placeholder={'Имя'}/></div>
            <div className={styles.input}><EmailInput name={'email'} /></div>
            <div className={styles.input}><PasswordInput name={'password'} /></div>
        </>
    );
}

export default ProfileSettings;
