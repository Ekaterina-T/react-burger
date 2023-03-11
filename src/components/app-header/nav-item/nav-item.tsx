/* eslint-disable import/no-cycle */
import React, { ReactElement } from 'react';
import { NavLink } from 'react-router-dom';

import styles from './nav-item.module.css';
import NavList from '../nav-list/nav-list';
import { TNavItem } from '../../../services/types/index';

function NavItem({
  data: {
    id, title, icon, cssClass, subitems, to,
  },
}: { data: TNavItem }): ReactElement {
  const isActive = (match: any) => {
    if (id === 'logo_desktop' || !match || !match.isExact) {
      return false;
    }

    return true;
  };

  return (
    <li className={cssClass ? styles[cssClass] : styles.nav_item}>
      <NavLink
        to={to || '/'}
        isActive={isActive}
        className={styles.nav_link}
        activeClassName="nav_link-active"
      >
        {icon}
        <span className={styles.link_text}>{title}</span>
      </NavLink>
      { !!subitems && <NavList data={subitems} type="nested" />}
    </li>
  );
}

export default NavItem;
