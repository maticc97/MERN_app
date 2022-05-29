const res = require('express/lib/response');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const User = require('../models/User');
const mongoose = require('mongoose');
const req = require('express/lib/request');
const { body } = require('express-validator');

const passport = require('passport');
const { debug } = require('request');
const logging = config.get('debug');

const timestamp = require('../../config/time.js');

const REQUIRED_FIELDS_ERR = 'Please provide all of the required fields -----> ';
const REGEX_EMAIL = new RegExp('[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,}');

async function encryptPassword(password) {
  const salt = await bcrypt.genSalt(10);
  password = await bcrypt.hash(password, salt);
  return password;
}

//add new user
const addUser = (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(421).json({
      error: REQUIRED_FIELDS_ERR + 'username, email, password',
    });
  } else if (!REGEX_EMAIL.test(email)) {
    return res.status(422).json({
      error: 'Must be in an email format (___@__.__)',
    });
  }

  User
    //check if email is taken
    .findOne({ email: req.body.email })
    .then(async (existingMailUser) => {
      //if email is not taken, then check for taken username
      if (!existingMailUser) {
        User.findOne({ username: req.body.username }).then(
          async (existingUsernameUser) => {
            //if username is already taken
            if (existingUsernameUser) {
              if (logging)
                console.log(
                  timestamp.get_timestamp(),
                  'Username taken',
                  existingUsernameUser.username
                );
              return res
                .status(410)
                .json({ message: 'username already taken' });

              //else create new user
            } else {
              //create new user
              const user = await new User();
              user.username = username;
              user.email = email;
              user.password = await encryptPassword(password);
              await user.save();
              //sucessfuly added
              const payload = {
                user: {
                  id: user.id,
                },
              };
              jwt.sign(
                payload,
                //secret for hashing payload
                config.get('jwtSecret'),
                { expiresIn: 360000 },
                (err, token) => {
                  if (logging)
                    console.log(
                      timestamp.get_timestamp(),
                      ' New user --> ',
                      username,
                      ' created'
                    );
                  if (err) throw err;
                  res.status(200).json({ token });
                }
              );
              //.json({ token: user.generateJwt() });
            }
          }
        );
      }
      //if email is already taken
      else {
        if (logging)
          console.log(
            timestamp.get_timestamp(),
            'E-mail taken :',
            existingMailUser.email
          );
        return res
          .status(409)
          .json({ 'this e-mail already in use': existingMailUser.email });
      }
    })
    .catch((error) => renderApiError(req, res, error));
};

//verify user to login
const verifyUser = async (req, res) => {
  if (logging) {
    console.log(
      timestamp.get_timestamp(),
      'user: ' + req.body.email + ' attempted to log in at',
      timestamp.get_timestamp()
    );
  }
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      'error ': REQUIRED_FIELDS_ERR + ' email, password',
    });
  } else {
    try {
      let user = await User.findOne({ email });
      if (!user) {
        if (logging) {
          console.log(
            timestamp.get_timestamp(),
            'Auth failed because of invalid credientals'
          );
        }
        return res.status(404).json({ message: 'Invalid credientals' });
      }

      //check if pass matches
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        if (logging) {
          console.log(
            timestamp.get_timestamp(),
            'Auth failed because of invalid credientals'
          );
        }
        return res.status(404).json({ message: 'Invalid credientals' });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };
      jwt.sign(
        payload,
        //secret for hashing payload
        config.get('jwtSecret'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          if (logging) {
            console.log(
              timestamp.get_timestamp(),
              'Auth OK, user ' +
              req.body.email +
              ' sucessfully signed in at ' +
              timestamp.get_timestamp()
            );
          }
          res.status(200).json({ token });
        }
      );
    } catch (error) { }
  }
};

const getUsername = async (req, res) => {
  let username_to_return = await User.findById(req.user.id);
  return res.status(200).json({ username: username_to_return.username })
}

module.exports = {
  addUser,
  verifyUser,
  getUsername
};
