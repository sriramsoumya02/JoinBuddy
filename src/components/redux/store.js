import { applyMiddleware, compose, createStore, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import userReduers from './reducers/userReduers';
import dataReducers from './reducers/dataReducers';
import uiReducers from './reducers/uiReducers';

const initialstate = {};
const middleware = [thunkMiddleware];
const middlewareEnhancer = applyMiddleware(...middleware);
const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;
const enhancer = composeEnhancers(middlewareEnhancer);
const reducers = combineReducers({
  user: userReduers,
  data: dataReducers,
  UI: uiReducers,
});
const store = createStore(reducers, initialstate, enhancer);

export default store;
