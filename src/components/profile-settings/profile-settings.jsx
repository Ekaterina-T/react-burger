import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {Input, Button} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from '../../pages/index.module.css'
import profileStyles from './profile-settings.module.css'
import { updateUser } from '../../services/user/actions';

const PASSWORD_PLACEHOLDER = '******';

function ProfileSettings() {    

    const dispatch = useDispatch();
    const {name, email} = useSelector( store => store.user);

    //these are not application level data, therefore don't create separate action and reducer
    const [user, setUser] = React.useState({name: name, email: email, password: PASSWORD_PLACEHOLDER});

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
        dispatch(updateUser(updatedFields));
        setUser( prevState => ({...prevState , password: PASSWORD_PLACEHOLDER}))
    }

    const cancelChanges = (e) => {
        e.preventDefault();
        setUser({name: name, email: email, password: PASSWORD_PLACEHOLDER});
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
