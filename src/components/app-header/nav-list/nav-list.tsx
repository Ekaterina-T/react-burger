/* eslint-disable import/no-cycle */
import React, { ReactElement } from 'react';
import styles from './nav-list.module.css';
import NavItem from '../nav-item/nav-item';

import { TNavItem } from '../../../services/types/index';

interface INavListProps {
  data: Array<TNavItem>;
  type: 'main' | 'nested';
}

function NavList({ data, type }: INavListProps): ReactElement {
  return (
    <ul className={type === 'main' ? styles.main_nav : styles.nested_nav}>
      { data && data.map((item: TNavItem) => (
        <NavItem
          key={item.id}
          data={item}
        />
      ))}
    </ul>
  );
}

export default NavList;
