import React from 'react';
import styles from './app-header.module.css';
import {Logo, BurgerIcon, ListIcon, ProfileIcon, CloseIcon}  from '@ya.praktikum/react-developer-burger-ui-components';
import {MenuIcon} from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/menu-icon';
import NavList from './nav-list/nav-list';

const AppHeader = (): React.ReactElement | null => {

    const menuItems = [
        {id: "constructor", title: "Конструктор", to: '/', icon: <BurgerIcon type="secondary"/> }, 
        {id: "feed", title: "Лента заказов", to: '/feed', icon: <ListIcon type="secondary"/> }, 
        {id: "logo_desktop", title: "", to: '/', icon: <Logo/>, cssClass: "logo_desktop_item" }, 
        {id: "profile", title: "Личный кабинет", to: '/profile', icon: <ProfileIcon type="secondary"/>, cssClass: "profile_item", subitems: [
            {id: "account", title: "Профиль" }, 
            {id: "history", title: "История заказов" }, 
            {id: "logout", title: "Выход" }
        ] }
    ];

    return (
        <header  className = {styles.header}>    

            <h1 className="visually-hidden"><span>Stellar Burger</span></h1>              

            <nav className = {styles.nav}>
                <div className="visibility_mobile"><Logo/></div>
                <NavList data={menuItems} type="main" setDefault={true}/>                    
                <div className="visibility_mobile"><CloseIcon type="primary"/></div>
                <div className="visibility_mobile"><MenuIcon type="primary"/></div>
            </nav> 

        </header>
    );
}

export default AppHeader;