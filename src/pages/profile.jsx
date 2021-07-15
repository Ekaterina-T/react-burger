import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Switch, NavLink, useLocation } from 'react-router-dom';
import ProfileSettings from '../components/profile-settings/profile-settings';

import AppForm from '../components/app-form/app-form';
import FeedList from '../components/feed-list/feed-list';
import RouteForAuthorizedUsers from '../components/route-auth-users/route-auth-users';
import { logout} from '../services/user/actions';

import styles from './profile.module.css';

function ProfilePage() { 
    
    const dispatch = useDispatch();
    const {loginSuccess} = useSelector(store => store.user); 

    const {pathname} = useLocation();
        
    const profileMenuItems = React.useMemo( () => { 

        const exitHandler = (e) => {
            e.preventDefault();
            dispatch(logout());
        };

        return [
            {to: '/profile', label: 'Профиль', infoText: 'В этом разделе вы можете изменить свои персональные данные'},
            {to: '/profile/orders', label: 'История заказов', infoText: 'В этом разделе вы можете просмотреть свою историю заказов'},
            {to: '', onClickHandler: exitHandler, label: 'Выход'}
        ]
    }, 
    [dispatch]);
    
    const infoText = React.useMemo( () => {
        const currentMenuItem = profileMenuItems.find( item => item.to === pathname);
        return currentMenuItem ? currentMenuItem.infoText : '';
    }, 
    [pathname, profileMenuItems]);


    return (
        <>
        { loginSuccess && <AppForm additionalStyles={['profileForm']}>

                <section className={styles.profileNav}>
                    <ul>
                        {
                        profileMenuItems.map( (item, index) => (
                            <li key={index}>
                                <NavLink 
                                to={item.to} 
                                exact 
                                onClick={item.onClickHandler}
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
                        <RouteForAuthorizedUsers exact path='/profile/orders'> <FeedList owner={'profile'} /> </RouteForAuthorizedUsers>
                        <RouteForAuthorizedUsers exact path='/profile'> <ProfileSettings /> </RouteForAuthorizedUsers>
                    </Switch>                    
                </section>

            </AppForm>
        }
        </>
    );
}

export default ProfilePage;
