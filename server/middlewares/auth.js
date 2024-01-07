'use strict';
const User = require('../models/user-model');
const jwt = require('jsonwebtoken');
const protect = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      res.status(401);
      throw new Error('Not authorized,please login');
    }
    const verified = jwt.verify(token, process.env.APIKEY);
    const user = await User.findById(verified.id).select('-password');
    if (!user) {
      res.status(401);
      throw new Error('User not found');
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(401);
    throw new Error('Not authorized,please login');
  }
};
module.exports = protect;


