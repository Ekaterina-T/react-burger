import styles from './app-header.module.css';
import {Logo, BurgerIcon, ListIcon, ProfileIcon}  from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';


class AppHeader extends React.Component {

    render() {

        return (
            <header  className = {styles.header}>
    
                <nav className = {styles.site_nav}>
    
                    <ul className = {styles.link_list}>
                        <li className={styles.nav_elem}> 
                            <a className={ styles.nav_link } href="#">
                                <BurgerIcon/> <span>Конструктор </span>
                            </a> 
                        </li>
                        <li className={styles.nav_elem}> 
                            <a className={ styles.nav_link} href="#">
                                <ListIcon/> <span>Лента заказов </span>
                            </a> 
                        </li>
                    </ul> 
    
                    <h1> <Logo /> <span className="visually-hidden">Stellar Burger</span></h1>   
    
                    <div className={styles.nav_elem}> 
                        <a className={ styles.nav_link} href="#">
                            <ProfileIcon /> <span> Личный кабинет </span>
                        </a> 
                    </div>
    
                </nav>  
    
            </header>
        );
    } 
}

export default AppHeader;