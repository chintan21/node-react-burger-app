const { Ingredients } = require('../models/Ingredients');
const keys = require('../config/keys');

const mongoose = require('mongoose');

mongoose.connect(
  keys.mongoURI,
  { useNewUrlParser: true }
);

const ingredient = new Ingredients({});
ingredient.save().then(res => {
  console.log('finish');
});
