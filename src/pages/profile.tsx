/* eslint-disable react/jsx-no-useless-fragment */
import React from 'react';
import { Switch, NavLink, useLocation } from 'react-router-dom';
import ProfileSettings from '../components/profile-settings/profile-settings';

import AppForm from '../components/app-form/app-form';
// eslint-disable-next-line import/no-cycle
import FeedList from '../components/feed-list/feed-list';
import RouteForAuthorizedUsers from '../components/route-auth-users/route-auth-users';
import { logout } from '../services/user/actions';
import { socketType } from '../utils/constants';

import styles from './profile.module.css';

import { useAppSelector, useAppDispatch } from '../services/types';

function ProfilePage() {
  const dispatch = useAppDispatch();
  const { loginSuccess } = useAppSelector((store) => store.user);
  const { data } = useAppSelector((store) => store.orders[socketType.personalOrders]);

  const { pathname } = useLocation();

  const profileMenuItems = React.useMemo(
    () => {
      const exitHandler = (e: React.MouseEvent) => {
        e.preventDefault();
        dispatch(logout());
      };

      return [
        { to: '/profile', label: 'Профиль', infoText: 'В этом разделе вы можете изменить свои персональные данные' },
        { to: '/profile/orders', label: 'История заказов', infoText: 'В этом разделе вы можете просмотреть свою историю заказов' },
        { to: '', onClickHandler: exitHandler, label: 'Выход' },
      ];
    },
    [dispatch],
  );

  const infoText = React.useMemo(
    () => {
      const currentMenuItem = profileMenuItems.find((item) => item.to === pathname);
      return currentMenuItem ? currentMenuItem.infoText : '';
    },
    [pathname, profileMenuItems],
  );

  return (
    <>
      { loginSuccess && (
      <AppForm additionalStyles={['profileForm']}>

        <section className={styles.profileNav}>
          <ul>
            {
              profileMenuItems.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    exact
                    onClick={item.onClickHandler}
                    className={styles.profileNavItem}
                    activeClassName="nav_link-active"
                  >

                    {item.label}

                  </NavLink>
                </li>
              ))
            }
          </ul>
          <p className={styles.profileInfo}>{infoText}</p>
        </section>

        <section>
          <Switch>
            {data && (
            <RouteForAuthorizedUsers exact path="/profile/orders">

              <FeedList owner="profile" data={data} />

            </RouteForAuthorizedUsers>
            ) }
            <RouteForAuthorizedUsers exact path="/profile">

              <ProfileSettings />

            </RouteForAuthorizedUsers>
          </Switch>
        </section>

      </AppForm>
      )}
    </>
  );
}

export default ProfilePage;
