import React from 'react';

export const Landing = () => {
  return (
    <section classNameName='landing'>
      <div className='dark-overlay'>
        <div className='landing-inner'>
          <h1 className='x-large'>NetConf monitor</h1>
          <p className='lead'>
            Portal for monitoring network devices using netconf
          </p>
          <div className='buttons'>
            <a href='register.html' className='btn btn-primary'>
              Sign Up
            </a>
            <a href='login.html' className='btn btn-light'>
              Login
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Landing;
