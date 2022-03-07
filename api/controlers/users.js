const res = require('express/lib/response');
const bcrypt = require('bcryptjs');
const User = require('../../models/User');
const mongoose = require('mongoose');

const REQUIRED_FIELDS_ERR = 'Please provide all of the required fields -----> ';
const REGEX_EMAIL = new RegExp('[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,}');

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
              const salt = await bcrypt.genSalt(10);
              user.password = await bcrypt.hash(password, salt);
              await user.save();
              //sucessfuly added
              return res.status(200).send();
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

module.exports = {
  addUser,
};
