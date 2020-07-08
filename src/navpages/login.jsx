import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Joi from 'joi';
import Form from '../components/common/form';
import Brand from './bluebirdbig.png';
import http from '../services/httpServices';
class Login extends Form {
  state = {
    data: { email: '', password: '' },
    errors: {},
    loading: false,
  };

  schema = {
    email: Joi.string().email().required().label('Email'),
    password: Joi.string().min(5).required().label('Password'),
  };
  doSubmit = async (e) => {
    console.log(' login request started');
    try {
      this.setState({ loading: true });
      const result = await http.post('/login', this.state.data);
      this.setState({ loading: false });
      localStorage.setItem('AuthToken', result.data.token);
      console.log('result', result);
      this.props.history.replace('/');
    } catch (ex) {
      this.setState({ loading: false });
      console.log('ex', ex.response);
      if (
        ex.response &&
        ex.response.status >= 400 &&
        ex.response.status < 500
      ) {
        const errors = { ...this.state.errors };
        for (const [key, value] of Object.entries(ex.response.data)) {
          errors[key] = value;
        }
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <div className="row m-3 ">
        <div className="col-md-5 offset-md-3 bg-white rounded p-5">
          <img src={Brand} alt="Join Buddy" className=" d-block m-auto" />
          <h3 className="text-primary text-center mb-5">Login</h3>
          <form onSubmit={this.handleSubmit}>
            {this.renderInput(
              'email',
              'Email',
              'email',
              'Enter Email',
              'email'
            )}
            {this.renderInput(
              'password',
              'Password',
              'password',
              'Enter password',
              'password'
            )}
            {this.renderSubmit('Login')}
            <small className="text-muted">
              Don't have account.Signup <Link to="/signUp"> here</Link>
            </small>
            {this.state.errors.general && (
              <small className="text-danger mt-2">
                {this.state.errors.general}
              </small>
            )}
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
