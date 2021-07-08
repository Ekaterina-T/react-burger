import { useSelector } from 'react-redux';
import { Redirect, Route} from 'react-router-dom';

export default function RouteForAuthorizedUsers({ children, ...rest }) {

  const { loginSuccess } = useSelector(store => store.user);

  const render = ({location}) => {

    if(loginSuccess) {
        return children;
    }
    
    return <Redirect to={{ pathname: '/login', state: { target: location } }} />; 
  }

  return <Route {...rest} render={ render } />;
  
}
