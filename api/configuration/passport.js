const mongoose = require('mongoose');
const User = mongoose.model('User');
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;

passport.use(
    new localStrategy(
        {
            usernameField: 'email',
            passwordField: 'password'
        },
        (email, password, done) => {
            User.findOne(
                { email: email },
                (error, user) => {
                    if (error)
                        return done(error);
                    if (!user) {
                        return done(null, false, {
                            "message": "wrong email"
                        });
                    }
                    if (!user.checkPassword(password)) {
                        return done(null, false, {
                            "message": "wrong password"
                        });
                    }
                    return done(null, user);
                }
            );
        }
    )

);