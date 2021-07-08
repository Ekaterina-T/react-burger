import React from 'react';
import {Input, Button} from '@ya.praktikum/react-developer-burger-ui-components';

import { getCookie } from '../../utils/cookie';
import { authEndpoints, accessTokenName } from '../../utils/constants';

//TODO: fix style link
import styles from '../../pages/index.module.css'
import profileStyles from './profile-settings.module.css'

function ProfileSettings() {    

    //these are not application level data, therefore don't create separate action and reducer
    const [user, setUser] = React.useState({name: '', email: '', password: '******'});

    const printConfirmedSettings = () => {

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
           setUser({...res.user, password: '******'}); //password is crunched

        }).catch( (res) => {
            console.log(res)
        });
    };

    const updateProfileSettings = (updatedFields) => {

        fetch(authEndpoints.userUrl, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                authorization: getCookie(accessTokenName)
            },
            body: JSON.stringify(updatedFields)
        })
        .then(res => res.ok ? res.json() : Promise.reject(res))
        .then( () => {
            /*
                {
                    "success": true,
                    "user": {
                    "email": "",
                    "name": ""
                    }
                } 
            */
            console.log('credential are updated')

        }).catch( (res) => {
            console.log('credential are not updated')
        });
    };

    React.useEffect( () => {
        printConfirmedSettings();
    }, []);

    const updateField = (e) => {
        setUser({...user, [e.target.name]: e.target.value});
    }
    
    const saveChanges = (e) => {
        e.preventDefault();

        const updatedFields = {};

        updatedFields.name = user.name;
        updatedFields.email = user.email;
        if(user.password.indexOf('*') < 0) {
            updatedFields.password = user.password;
        }
        updateProfileSettings(updatedFields);
    }

    const cancelChanges = (e) => {
        e.preventDefault();
        printConfirmedSettings();
    }

    return (
        <article>
            <div className={styles.input}>
                <Input 
                    type="text" 
                    onChange = {updateField}
                    name={'name'} 
                    placeholder={'Имя'} 
                    icon={'EditIcon'} 
                    value={user.name}/>
            </div>
            <div className={styles.input}>
                <Input 
                    name={'email'} 
                    onChange = {updateField}
                    icon={'EditIcon'} 
                    value={user.email}/>
            </div>
            <div className={styles.input}>
                <Input 
                    name={'password'} 
                    onChange = {updateField}
                    placeholder={'Пароль'} 
                    icon={'EditIcon'}
                    value={user.password}/>
            </div>
            <div className={profileStyles.buttonsArea}>
                <Button type="primary" size="medium" onClick={saveChanges}> Сохранить </Button>
                <div className={profileStyles.buttonSeparator}> </div>
                <Button type="primary" size="medium" onClick={cancelChanges}> Отмена </Button>
            </div>
        </article>
    );
}

export default ProfileSettings;
