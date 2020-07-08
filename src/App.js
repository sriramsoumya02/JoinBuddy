import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import JwtDecode from 'jwt-decode';
import Navbar from './components/common/navbar';
import Home from './navpages/home';
import Login from './navpages/login';
import SignUp from './navpages/signUp';
import AuthRoute from './components/common/AuthRoute';

//redux
import { Provider } from 'react-redux';
import store from './components/redux/store';
const token = localStorage.getItem('AuthToken');
let authenticated;
if (token) {
  const decodedToken = JwtDecode(token);
  console.log('decodedToken', decodedToken);
  if (decodedToken.exp * 1000 < Date.now()) {
    window.location.href = '/login';
    authenticated = false;
  } else {
    authenticated = true;
  }
}
function App() {
  return (
    <Provider store={store}>
      <div>
        <Navbar />
        <div className="container my-2 pl-5">
          <Switch>
            <AuthRoute
              path="/login"
              component={Login}
              authenticated={authenticated}
            ></AuthRoute>
            <AuthRoute
              path="/signUp"
              component={SignUp}
              authenticated={authenticated}
            ></AuthRoute>
            <Route path="/" exact component={Home}></Route>
          </Switch>
        </div>
      </div>
    </Provider>
  );
}

export default App;
