import React from 'react';

const input = ({
  name,
  label,
  id,
  type,
  placeholder,
  onChange,
  value,
  error,
}) => {
  return (
    <div className="form-group">
      <label htmlFor={name} className="text-primary font-weight-bold">
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={id}
        placeholder={placeholder}
        className={`form-control formcontrol-lg  ${error ? 'is-invalid' : ''}`}
        onChange={onChange}
        value={value}
      />

      <div className="invalid-feedback">{error}</div>
    </div>
  );
};

export default input;
