import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Joi from 'joi';
import Form from '../components/common/form';
import Brand from './bluebirdbig.png';
import http from '../services/httpServices';
class Signup extends Form {
  state = {
    data: { email: '', password: '', confirmPassword: '', handle: '' },
    errors: {},
    loading: false,
  };

  schema = {
    email: Joi.string().email().required().label('Email'),
    password: Joi.string().min(5).required().label('Password'),
    confirmPassword: Joi.string()
      .min(5)
      .required()
      .label(
        'ConfirmPassword'
      ) /*Joi.any()
      .valid(Joi.ref('password'))
      .required()
      .strict()
      .options({ language: { any: { allowOnly: 'must match password' } } }),*/,
    handle: Joi.string().required().label('Handle'),
  };
  doSubmit = async (e) => {
    console.log(' login request started');
    try {
      this.setState({ loading: true });
      const result = await http.post('/signup', this.state.data);
      this.setState({ loading: false });
      //const token = result.data.token;
      console.log('result', result);
      localStorage.setItem('AuthToken', result.data.token);
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
            {this.renderInput(
              'confirmPassword',
              'ConfirmPassword',
              'confirmPassword',
              'Enter confirmPassword',
              'password'
            )}
            {this.renderInput('handle', 'handle', 'handle', 'Enter handle')}
            {this.renderSubmit('Sign Up')}
            <small className="text-muted">
              Already have an account? Login <Link to="/login"> here</Link>
            </small>
            {this.state.errors.error && (
              <small className="text-danger mt-2">
                {this.state.errors.error}
              </small>
            )}
          </form>
        </div>
      </div>
    );
  }
}

export default Signup;
