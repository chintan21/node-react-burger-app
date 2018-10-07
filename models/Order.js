const mongoose = require('mongoose');
const { Schema } = mongoose;
const validator = require('validator');

const OrderSchema = new Schema({
  ingredients: {
    bacon: { type: Number, default: 0 },
    cheese: { type: Number, default: 0 },
    salad: { type: Number, default: 0 },
    meat: { type: Number, default: 0 }
  },
  orderData: {
    country: { type: String, required: true, trim: true },
    deliveryMethod: { type: String, default: 'fastest' },
    email: {
      type: String,
      required: true,
      minLength: 3,
      trim: true,
      validate: {
        validator: validator.isEmail,
        message: `{VALUE} is not valid email`
      }
    },
    name: {
      type: String,
      required: true,
      minLength: 3,
      trim: true
    },
    street: {
      type: String,
      required: true,
      minLength: 2,
      trim: true
    },
    zipCode: {
      type: Number,
      required: true,
      minLength: 6,
      maxLength: 6,
      trim: true
    }
  },
  price: { type: Number, required: true },
  _user: { type: Schema.Types.ObjectId, ref: 'Users' }
});

const Orders = mongoose.model('orders', OrderSchema);
module.exports = { Orders };
