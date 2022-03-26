import React from 'react';
import { Link } from 'react-router-dom';

export const Landing = () => {
  return (
    <section className='Landing'>
      <div className='dark-overlay'>
        <div className='landing-inner'>
          <h1 className='x-large'>NetConf monitor</h1>
          <p className='lead'>
            Portal for monitoring network devices using netconf
          </p>
          <div className='buttons'>
            <Link to='/register' className='btn btn-primary'>
              Sign Up
            </Link>
            <Link to='/login' className='btn btn-light'>
              Login
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Landing;
