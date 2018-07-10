var jwt = require('jsonwebtoken');
var {User} = require('./../models/user');

var authenticate = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token,process.env.JWT_KEY);
    req.userData = decoded;
    next();
  } catch (e) {
    console.log(e);
    return res.status(401).json ({
      message: 'auth faild'
    })
  }
};

module.exports = {authenticate};
