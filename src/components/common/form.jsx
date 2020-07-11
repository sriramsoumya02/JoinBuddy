import React, { Component } from 'react';
import Joi from 'joi';
import Input from './input';
class Form extends Component {
  state = {
    data: {},
    errors: {},
    // loading: false,
  };
  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);
    const errors = {};
    if (!error) return null;
    error.details.map((item) => (errors[item.path[0]] = item.message));
    if (
      this.state.data.confirmPassword &&
      this.state.data.confirmPassword !== this.state.data.password
    )
      errors.confirmPassword = 'passwords didnt match';
    return errors;
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;
    this.doSubmit(e);
  };
  validateProperty = ({ name, value }) => {
    console.log(' in validateProperty', { [name]: value });
    if (name === 'confirmPassword') {
      if (value !== this.state.data.password) return 'passwords didnt match';
      else return null;
    } else {
      const { error } = Joi.validate(
        { [name]: value },
        { [name]: this.schema[name] }
      );
      return error ? error.details[0].message : null;
    }
  };

  handleChange = ({ currentTarget: input }) => {
    const errorMessage = this.validateProperty(input);
    let data = { ...this.state.data };
    console.log('data 11111', data);
    let errors = { ...this.state.errors };
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];
    data[input.name] = input.value;
    console.log('data', data);
    this.setState({ data, errors });
    // console.log(' in handle Change', this.state);
  };

  renderInput(name, label, id, placeholder, type = 'text') {
    return (
      <Input
        name={name}
        label={label}
        id={id}
        type={type}
        placeholder={placeholder}
        onChange={this.handleChange}
        value={this.state.data[name]}
        error={this.state.errors[name]}
      />
    );
  }

  renderSubmit(name) {
    return (
      <button
        disabled={this.validate() && !this.props.UI.loading}
        className="btn btn-primary btn-block mt-5"
      >
        {this.props.UI.loading && (
          <span
            className="spinner-border spinner-border-sm"
            role="status"
            aria-hidden="true"
          ></span>
        )}
        {name}
      </button>
    );
  }
}

export default Form;
