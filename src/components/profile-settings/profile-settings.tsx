import React from 'react';
import {Input, Button} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from '../../pages/index.module.css'
import profileStyles from './profile-settings.module.css'
import { updateUser } from '../../services/user/actions';

import { useAppSelector, useAppDispatch } from '../../services/types';

const PASSWORD_PLACEHOLDER = '******';

interface IUserInfo {
    name: string;
    email: string;
    password: string;
}

interface IUserInfoOptionalPassword {
    name: string;
    email: string;
    password?: string;
}

function ProfileSettings() {    

    const dispatch = useAppDispatch();
    const {name, email} = useAppSelector( store => store.user);

    //these are not application level data, therefore don't create separate action and reducer
    const [user, setUser] = React.useState<IUserInfo>({name: name, email: email, password: PASSWORD_PLACEHOLDER});

    const updateField = (e: React.ChangeEvent) => {
        const elem = e.target as HTMLInputElement;
        setUser({...user, [elem.name]: elem.value});
    }
    
    const saveChanges = (e: React.SyntheticEvent) => {
        e.preventDefault();

        const updatedFields: IUserInfoOptionalPassword = {name: user.name, email: user.email};

        if(user.password && user.password.indexOf('*') < 0) {
            updatedFields.password = user.password;
        }
        dispatch(updateUser(updatedFields));
        setUser( prevState => ({...prevState , password: PASSWORD_PLACEHOLDER}))
    }

    const cancelChanges = (e: React.SyntheticEvent) => {
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
