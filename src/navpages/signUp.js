import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Joi from 'joi';
import Form from '../components/common/form';
import Brand from './bluebirdbig.png';
import { signUpUser } from '../components/redux/actions/userActions';
class Signup extends Form {
  state = {
    data: { email: '', password: '', confirmPassword: '', handle: '' },
    errors: {},
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
  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
    }
  }
  doSubmit = async (e) => {
    console.log(' signup request started');
    this.props.signUpUser(this.state.data, this.props.history);
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
const mapStatetoProps = (state) => ({
  UI: state.UI,
  user: state.user,
});
const mapDispatchToProps = (dispatch) => ({
  signUpUser: (newUserData, history) =>
    dispatch(signUpUser(newUserData, history)),
});
export default connect(mapStatetoProps, mapDispatchToProps)(Signup);
