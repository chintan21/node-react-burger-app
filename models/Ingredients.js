const mongoose = require('mongoose');
const { Schema } = mongoose;

const IngredientSchema = new Schema({
  bacon: { type: Number, default: 0 },
  cheese: { type: Number, default: 0 },
  salad: { type: Number, default: 0 },
  meat: { type: Number, default: 0 }
});

const Ingredients = mongoose.model('Ingredients', IngredientSchema);

module.exports = { Ingredients };
