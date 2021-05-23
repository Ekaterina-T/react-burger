import React from 'react';
import styles from './app-header.module.css';
import {Button, Logo, BurgerIcon, ListIcon, ProfileIcon, CloseIcon, InfoIcon}  from '@ya.praktikum/react-developer-burger-ui-components';

class AppHeader extends React.Component {

    constructor (props) {        
        super(props);

        this.state = {
            activePageId: 'constructor'
        }
    }

    render() {

        return (
            <header  className = {styles.header}>    

                <h1 className="visually-hidden"><span>Stellar Burger</span></h1>              
    
                <nav className = {styles.nav}>

                    <div className={styles.visibility_mobile}><Logo/></div>

                    <ul className={styles.nav_items}>

                        <li>
                            <Button type="secondary" size="medium"><BurgerIcon />Конструктор </Button>
                        </li>

                        <li>
                            <a id="orders" href="#"><ListIcon /><span>Лента заказов </span></a> 
                        </li>

                        <li className={styles.visibility_desktop}> <a id="logo_desktop" href="#"><Logo /></a> </li>   
                    
                        <li>
                            <a id="profile" href="#"><ProfileIcon /><span> Личный кабинет </span></a> 
                            <ul>
                                <li>
                                    <a id="account" href="#"><span>Профиль </span></a> 
                                </li>
                                <li>
                                    <a id="history" href="#"><span>История заказов </span></a> 
                                </li>
                                <li>
                                    <a id="logout" href="#"><span>Выход </span></a> 
                                </li>
                            </ul>
                        </li> 
                    </ul>  
                    
                    <div className={styles.visibility_mobile}><CloseIcon/></div>
                    <div className={styles.visibility_mobile}><InfoIcon/></div>
                </nav> 
    
            </header>
        );
    } 
}

export default AppHeader;