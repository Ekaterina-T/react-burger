import React from 'react';
import { Redirect, Route } from 'react-router-dom';

import { useAppSelector } from '../../services/types';

interface IRouteForAuthorizedUsersProps {
  children: any,
  [name: string]: any;
}

function RouteForAuthorizedUsers({ children, ...rest }: IRouteForAuthorizedUsersProps) {
  const { loginSuccess } = useAppSelector((store) => store.user);

  const render = ({ location } : { location: any }) => {
    if (loginSuccess) {
      return children;
    }

    return <Redirect to={{ pathname: '/login', state: { target: location } }} />;
  };

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Route {...rest} render={render} />;
}

export default RouteForAuthorizedUsers;
