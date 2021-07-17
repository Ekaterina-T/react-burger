import { useSelector } from 'react-redux';
import { Redirect, Route} from 'react-router-dom';

const getNextPage = (location, history) => {

  let result;

  if(location && location.state?.target) {
    result = location.state.target;
    delete location.state.target;
  } else {
    result = '/';
  }

  return result;
}

export default function RouteForUnauthorizedUsers({ children, ...rest }) {

  const { loginSuccess } = useSelector(store => store.user);

  const render = ({location, history}) => {

    if(!loginSuccess) {
        return children;
    }
    
    return <Redirect to={getNextPage(location, history)}/>; 
  }

  return <Route {...rest} render={ render } />;
  
}
