import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import JwtDecode from 'jwt-decode';
import Navbar from './components/common/navbar';
import Home from './navpages/home';
import Login from './navpages/login';
import SignUp from './navpages/signUp';
import AuthRoute from './components/common/AuthRoute';
import { SET_AUTHENTICATED } from './components/redux/types';
import {
  logoutUser,
  getUserData,
  setAuthoraizationHeader,
} from './components/redux/actions/userActions';

//redux
import { Provider } from 'react-redux';
import store from './components/redux/store';
const token = localStorage.getItem('AuthToken');
if (token) {
  const decodedToken = JwtDecode(token);
  console.log('decodedToken', decodedToken);
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser());
    window.location.href = '/login';
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    setAuthoraizationHeader(token);
    store.dispatch(getUserData());
  }
}
function App() {
  return (
    <Provider store={store}>
      <div>
        <Navbar />
        <div className="container my-2 pl-5">
          <Switch>
            <AuthRoute path="/login" component={Login}></AuthRoute>
            <AuthRoute path="/signUp" component={SignUp}></AuthRoute>
            <Route path="/" exact component={Home}></Route>
          </Switch>
        </div>
      </div>
    </Provider>
  );
}

export default App;
