import React, { Component, Fragment } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Switch,
} from 'react-router-dom';
import './App.css';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing.js';
import Register from './components/auth/Register';
import Login from './components/auth/Login';

const App = () => (
  <Router>
    <Fragment>
      <Navbar />
      <Routes>
        <Route path='/' element={<Landing />} />
      </Routes>
      <section className='container'>
        <Routes>
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
        </Routes>
      </section>
    </Fragment>
  </Router>
);

export default App;
