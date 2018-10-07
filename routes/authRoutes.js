const { User } = require('../models/Users');
const _ = require('lodash');
const { authenticate } = require('../middleware/authenticate');

module.exports = app => {
  app.post('/api/signup', (req, res) => {
    const body = _.pick(req.body, ['email', 'password']);
    const user = new User(body);
    user
      .save()
      .then(() => {
        return user.generateAuthToken();
      })
      .then(token => res.header('Authorization', token).send(user))
      .catch(e => {
        res.status(400).send({ error: e });
      });
  });
  app.post('/api/login', (req, res) => {
    const body = _.pick(req.body, ['email', 'password']);
    User.findByCredentials(body.email, body.password)
      .then(user => {
        return user.generateAuthToken().then(token => {
          res.header('Authorization', token).send(user);
        });
      })
      .catch(e => {
        res.status(400).send({ error: e });
      });
  });
  app.delete('/api/logout', authenticate, (req, res) => {
    req.user
      .removeToken(req.header('Authorization'))
      .then(() => {
        console.log('finally');
        res.status(200).send();
      })
      .catch(() => res.status(400).send());
  });
};
