import thunk from 'redux-thunk';
import { rootReducer } from './rootReducer';
import { socketMiddleware } from './middleware/socketMiddleware';

import { compose, createStore, applyMiddleware } from 'redux';

declare global {
    interface Window {
      __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
  }

export const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    
const enhancer = composeEnhancers(applyMiddleware( thunk/*, socketMiddleware */));
export const store = createStore(rootReducer, enhancer);