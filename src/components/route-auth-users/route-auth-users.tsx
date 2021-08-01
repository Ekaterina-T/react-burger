import { FC } from 'react';
import { Redirect, Route} from 'react-router-dom';

import { useAppSelector } from '../../services/types';

interface IRouteForAuthorizedUsersProps {
  [name: string]: any;
}

const RouteForAuthorizedUsers: FC<IRouteForAuthorizedUsersProps> = ({ children, ...rest }) => {

  const { loginSuccess } = useAppSelector(store => store.user);

  const render = ({location} : {location: any}) => {

    if(loginSuccess) {
        return children;
    }
    
    return <Redirect to={{ pathname: '/login', state: { target: location } }} />; 
  }

  return <Route {...rest} render={ render } />;
  
}

export default RouteForAuthorizedUsers;
