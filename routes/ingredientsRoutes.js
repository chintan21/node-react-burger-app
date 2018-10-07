const keys = require('../config/keys');
const { Ingredients } = require('../models/Ingredients');

module.exports = app => {
  app.get('/api/ingredients', (req, res) => {
    Ingredients.findById(keys.ING_ID) //use your id from database
      .then(ingredient => {
        res.send(ingredient);
      })
      .catch(e => {
        res.status(400).send({ error: 'cannot get data' });
      });
  });
};
