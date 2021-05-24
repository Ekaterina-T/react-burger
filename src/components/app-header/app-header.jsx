import React from 'react';
import styles from './app-header.module.css';
import {Logo, BurgerIcon, ListIcon, ProfileIcon, CloseIcon}  from '@ya.praktikum/react-developer-burger-ui-components';
import {MenuIcon} from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/menu-icon';
import MenuUL from './menu-ul/menu-ul';

class AppHeader extends React.Component {

    constructor (props) {        
        super(props);

        this.state = {
            activePageId: 'constructor'
        }
    }

    render() {

        const menu_items = [
            {id: "constructor", title: "Конструктор", href: "#", iconSec: <BurgerIcon type="secondary"/>, iconPri:  <BurgerIcon type="primary"/> }, 
            {id: "orders", title: "Лента заказов", href: "#", iconSec: <ListIcon type="secondary"/>, iconPri:  <ListIcon type="primary"/> }, 
            {id: "logo_desktop", title: "", href: "#", iconSec: <Logo type="secondary"/>, iconPri:  <Logo type="primary"/> }, 
            {id: "profile", title: "Личный кабинет", href: "#", iconSec: <ProfileIcon type="secondary"/>, iconPri:  <ProfileIcon type="primary"/>, subitems: [
                {id: "account", title: "Профиль" }, 
                {id: "history", title: "История заказов" }, 
                {id: "logout", title: "Выход" }
            ] }
        ];

        return (
            <header  className = {styles.header}>    

                <h1 className="visually-hidden"><span>Stellar Burger</span></h1>              
    
                <nav className = {styles.nav}>

                    <div className={styles.visibility_mobile}><Logo/></div>

                    <MenuUL data={menu_items} type="main" setDefault={true}/>
                    
                    <div className={styles.visibility_mobile}><CloseIcon/></div>
                    <div className={styles.visibility_mobile}><MenuIcon /></div>
                </nav> 
    
            </header>
        );
    } 
}

export default AppHeader;