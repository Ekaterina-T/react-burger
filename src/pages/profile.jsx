import React, { useMemo } from 'react';
import { Switch, Route, NavLink, useLocation } from 'react-router-dom';
import ProfileSettings from '../components/profile-settings/profile-settings';

import AppForm from '../components/app-form/app-form';

import styles from './profile.module.css';
    
const profileMenuItems = [
    {to: '/profile', label: 'Профиль', infoText: 'В этом разделе вы можете изменить свои персональные данные'},
    {to: '/profile/orders', label: 'История заказов', infoText: 'В этом разделе вы можете просмотреть свою историю заказов'},
    {to: '/profile/exit', label: 'Выход'}
];

function ProfilePage() { 

    const {pathname} = useLocation();

    const infoText = useMemo( () => {
        const currentMenuItem = profileMenuItems.find( item => item.to === pathname);
        return currentMenuItem ? currentMenuItem.infoText : '';
    }, 
    [pathname]);

    return (

        <AppForm additionalStyles={['profileForm']}>

            <section className={styles.profileNav}>
                <ul>
                    {
                       profileMenuItems.map( (item, index) => (
                           <li key={index}>
                               <NavLink 
                               to={item.to} 
                               exact 
                               className={styles.profileNavItem} 
                               activeClassName="nav_link-active"> {item.label} </NavLink>
                            </li>
                       )) 
                    }
                </ul>
                <p className={styles.profileInfo}>{infoText}</p>
            </section>

            <section>
                <Switch>
                    <Route path='/profile/orders'> orders </Route>
                    <Route path='/profile/orders/:id'> orders id </Route>
                    <Route path='/profile/exit'> exit </Route>
                    <Route path='/profile'> <ProfileSettings /> </Route>
                </Switch>                    
            </section>

        </AppForm>

    );
}

export default ProfilePage;
