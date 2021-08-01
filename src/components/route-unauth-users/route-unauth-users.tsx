import { FC } from 'react';
import { useAppSelector } from '../../services/types';
import { Redirect, Route} from 'react-router-dom';

const getNextPage = (location: any) => {

  let result;

  if(location && location.state?.target) {
    result = location.state.target;
    delete location.state.target;
  } else {
    result = '/';
  }

  return result;
}

interface IRouteForUnauthorizedUsersProps {
  [name: string]: any;
}

const RouteForUnauthorizedUsers: FC<IRouteForUnauthorizedUsersProps> = ({ children, ...rest }) => {

  const { loginSuccess } = useAppSelector(store => store.user);

  const render = ({location} : {location: any}) => {

    if(!loginSuccess) {
        return children;
    }
    
    return <Redirect to={getNextPage(location)}/>; 
  }

  return <Route {...rest} render={ render } />;
  
}

export default RouteForUnauthorizedUsers;
