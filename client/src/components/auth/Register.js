import React, { Fragment, useState } from 'react';
const axios = require('axios');

const proxy = require('../../config/var.json');
function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password2: '',
  });

  const { username, email, password, password2 } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      console.log('Psswords do not match');
    } else {
      const newUser = {
        username,
        email,
        password,
      };
      try {
        const config = {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        };
        const body = JSON.stringify(newUser);

        const res = axios.post(
          'http://localhost:5000/auth/register',
          body,
          config
        );
        console.log(res.data);
      } catch (error) {}
    }
  };

  return (
    <Fragment>
      <h1 className='large text-primary'>Register</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Create Your Account
      </p>
      <form className='form' onSubmit={(e) => onSubmit(e)}>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Full Name'
            name='username'
            value={username}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='email'
            placeholder='Email Address'
            name='email'
            value={email}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Password'
            name='password'
            minLength='6'
            value={password}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Confirm Password'
            name='password2'
            minLength='6'
            value={password2}
            onChange={(e) => onChange(e)}
          />
        </div>
        <input type='submit' className='btn btn-primary' value='Register' />
      </form>
      <p className='my-1'>
        Already have an account? <a href='login.html'>Sign In</a>
      </p>
    </Fragment>
  );
}

export default Register;
