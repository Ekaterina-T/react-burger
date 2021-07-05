import React from 'react';
import {EmailInput, PasswordInput, Input} from '@ya.praktikum/react-developer-burger-ui-components';

import { getCookie } from '../../utils/cookie';
import { authEndpoints, accessTokenName } from '../../utils/constants';

//TODO: fix style link
import styles from '../../pages/index.module.css'

function ProfileSettings() {    

    const [user, setUser] = React.useState({name: '', email: ''});

    React.useEffect( () => {

        fetch(authEndpoints.userUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                authorization: getCookie(accessTokenName)
            }
        }).then(res => res.ok ? res.json() : Promise.reject(res))
        .then( (res) => {
            /*
                {
                    "success": true,
                    "user": {
                    "email": "",
                    "name": ""
                    }
                } 
            */
           setUser(res.user);

        }).catch( (res) => {
            console.log(res)
        });

    }, []);

    return (
        <>
            <div className={styles.input}><Input type="text" name={'name'} placeholder={'Имя'} value={user.name}/></div>
            <div className={styles.input}><EmailInput name={'email'}  value={user.email}/></div>
            <div className={styles.input}><PasswordInput name={'password'} /></div>
        </>
    );
}

export default ProfileSettings;
