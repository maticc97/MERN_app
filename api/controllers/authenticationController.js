const res = require('express/lib/response');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const User = require('../../models/User');
const mongoose = require('mongoose');
const req = require('express/lib/request');
const { body } = require('express-validator');

const passport = require('passport');

const REQUIRED_FIELDS_ERR = 'Please provide all of the required fields -----> ';
const REGEX_EMAIL = new RegExp('[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,}');

async function encryptPassword(password) {
  const salt = await bcrypt.genSalt(10);
  password = await bcrypt.hash(password, salt);
  return password;
}

const addUser = (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(422).json({
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
              return res
                .status(410)
                .json({ message: 'username already taken' });
              //else create new user
            } else {
              //create new user
              const user = new User();
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
              console.log('aa');
              jwt.sign(
                payload,
                config.get('jwtSecret'),
                { expiresIn: 360000 },
                (err, token) => {
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
        return res
          .status(409)
          .json({ existingMailUser: 'this e-mail already in use' });
      }
    })
    .catch((error) => renderApiError(req, res, error));
};

const verifyUser = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      'error ': REQUIRED_FIELDS_ERR + ' fullName, username, email, password',
    });
  } else {
    passport.authenticate('local', (error, user, info) => {
      if (error) return res.status(500).json(error);
      if (user) {
        res.status(200).json({ token: user.generateJwt() });
      } else {
        res.status(401).json(info);
      }
    });
  }
};

module.exports = {
  addUser,
  verifyUser,
};
