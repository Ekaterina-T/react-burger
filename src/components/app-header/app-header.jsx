//import React from 'react';

import styles from './app-header.module.css';

import {Logo}  from '@ya.praktikum/react-developer-burger-ui-components';
import {BurgerIcon}  from '@ya.praktikum/react-developer-burger-ui-components';
import {ListIcon}  from '@ya.praktikum/react-developer-burger-ui-components';
import {ProfileIcon}  from '@ya.praktikum/react-developer-burger-ui-components';

function AppHeader(props) {

    //need better way of applying complex styles
    var navItemPadding = " pt-4 pr-5 pb-4 pl-5 ";
    var navLinkPadding = " ml-2 ";
    var navLinkText = " text text_type_main-default ";

    return (
        <header  className = {styles.header}>

            <nav className = {styles.site_nav}>

                <ul className = {styles.link_list}>
                    <li className={navItemPadding}> 
                        <a className={ navLinkPadding + navLinkText } href="#">
                            <BurgerIcon/> <span className={styles.link_text}>Конструктор </span>
                        </a> 
                    </li>
                    <li className={navItemPadding}> 
                        <a className={navLinkPadding + navLinkText} href="#">
                            <ListIcon/> <span className={styles.link_text}>Лента заказов </span>
                        </a> 
                    </li>
                </ul> 

                <h1> <Logo /> <span className="visually-hidden">Stellar Burger</span></h1>   

                <div className={navItemPadding}> 
                    <a className={navLinkPadding + navLinkText} href="#">
                        <ProfileIcon /> <span className={styles.link_text}> Личный кабинет </span>
                    </a> 
                </div>

            </nav>  

        </header>
    ); 
}

export default AppHeader;