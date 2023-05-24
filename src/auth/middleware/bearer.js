'use strict';

const { users } = require('../models/index.js');
const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {

  try {

    if (!req.headers.authorization) { next('Invalid Login'); }

    const token = req.headers.authorization.split(' ').pop();
    const validUser = await users.authenticateToken(token);

    req.user = validUser;
    req.token = validUser.token;

  } catch (e) {
    console.error(e);
    res.status(403).send('Invalid Login');
  }
};
