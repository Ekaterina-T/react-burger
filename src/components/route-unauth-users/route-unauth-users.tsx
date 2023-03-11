import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useAppSelector } from '../../services/types';

const getNextPage = (location: any) => {
  let result;

  if (location && location.state?.target) {
    result = location.state.target;
    // eslint-disable-next-line no-param-reassign
    delete location.state.target;
  } else {
    result = '/';
  }

  return result;
};

interface IRouteForUnauthorizedUsersProps {
  children: any,
  [name: string]: any;
}

function RouteForUnauthorizedUsers({ children, ...rest }: IRouteForUnauthorizedUsersProps) {
  const { loginSuccess } = useAppSelector((store) => store.user);

  const render = ({ location } : { location: any }) => {
    if (!loginSuccess) {
      return children;
    }

    return <Redirect to={getNextPage(location)} />;
  };

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Route {...rest} render={render} />;
}

export default RouteForUnauthorizedUsers;
