import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Joi from 'joi';
import Form from '../components/common/form';
import Brand from './bluebirdbig.png';
import { loginUser } from '../components/redux/actions/userActions';
class Login extends Form {
  state = {
    data: { email: '', password: '' },
    errors: {},
    //loading: false,
  };

  schema = {
    email: Joi.string().email().required().label('Email'),
    password: Joi.string().min(5).required().label('Password'),
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
    }
  }

  doSubmit = (e) => {
    console.log(' login request started');
    this.props.loginUser(this.state.data, this.props.history);
  };

  render() {
    return (
      <div className="row m-3 ">
        <div className="col-md-5 offset-md-3 bg-white rounded p-5">
          <img src={Brand} alt="Join Buddy" className=" d-block m-autom-auto" />
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
            <br />
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
const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
});
const mapDispatchToProps = (dispatch) => ({
  loginUser: (userdata, history) => dispatch(loginUser(userdata, history)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Login);
