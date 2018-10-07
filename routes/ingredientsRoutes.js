const { Ingredients } = require('../models/Ingredients');

module.exports = app => {
  app.get('/api/ingredients', (req, res) => {
    Ingredients.findById('5bb7bdf87c8b3d511646f112') //use your id from database
      .then(ingredient => {
        res.send(ingredient);
      })
      .catch(e => {
        res.status(400).send({ error: 'cannot get data' });
      });
  });
};
