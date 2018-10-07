const { authenticate } = require('../middleware/authenticate');
const { Orders } = require('../models/Order');

module.exports = app => {
  app.post('/api/order', authenticate, (req, res) => {
    const newOrder = { ...req.body, _user: req.user._id };
    const order = new Orders(newOrder);
    order
      .save()
      .then(or => {
        console.log('hello');
        res.send({ id: or._id });
      })
      .catch(e => {
        res.send({ error: e });
      });
  });
  app.get('/api/allorders', authenticate, (req, res) => {
    Orders.find({ _user: req.user._id })
      .then(orders => res.send(orders))
      .catch(e => res.status(400).send(err));
  });
};
