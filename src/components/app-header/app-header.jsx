import React from 'react';
import styles from './app-header.module.css';
import {Logo, BurgerIcon, ListIcon, ProfileIcon, CloseIcon}  from '@ya.praktikum/react-developer-burger-ui-components';
import {MenuIcon} from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/menu-icon';
import NavList from './nav-list/nav-list';

const AppHeader = (props) => {

    const menuItems = [
        {id: "constructor", title: "Конструктор", href: "#", icon: <BurgerIcon type="secondary"/> }, 
        {id: "orders", title: "Лента заказов", href: "#", icon: <ListIcon type="secondary"/> }, 
        {id: "logo_desktop", title: "", href: "#", icon: <Logo type="secondary"/>, cssClass: "logo_desktop_item" }, 
        {id: "profile", title: "Личный кабинет", href: "#", icon: <ProfileIcon type="secondary"/>, cssClass: "profile_item", subitems: [
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
                <div className="visibility_mobile"><CloseIcon/></div>
                <div className="visibility_mobile"><MenuIcon /></div>
            </nav> 

        </header>
    );
}

export default AppHeader;