const { User } = require('../models/Users');

const authenticate = (req, res, next) => {
  const token = req.header('Authorization');
  User.findByToken(token)
    .then(user => {
      if (!user) {
        Promise.reject();
      }
      req.user = user;
      req.token = token;
      next();
    })
    .catch(e => {
      res.status(400).send({ error: 'user not found' });
    });
};

module.exports = { authenticate };
