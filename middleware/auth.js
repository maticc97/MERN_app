const debug = true;
const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
  //Get token from header
  const token = req.header('x-auth-token');

  //check if not token
  if (!token) {
    return res.status(401).json({ msg: 'No token, auth denied' });
  }

  //verify token if there is one
  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));

    //Below is payload of the token created
    /*const payload = {
                user: {
                  id: user.id,
                },
              };*/

    //we can use req.user later
    req.user = decoded.user;
    if (debug) {
      console.log('User ID decoded from token ->', req.user);
    }
    next(); //ext is used to pass control to the next middleware function
  } catch {
    res.status(401).json({ mes: 'Token not valid' });
  }
};
