const mongoose = require('mongoose');
const { Schema } = mongoose;
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const uniqueValidator = require('mongoose-unique-validator');

const Users = new Schema({
  email: {
    type: String,
    required: true,
    minLength: 3,
    trim: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: `{VALUE} is not valid Email`
    }
  },
  password: {
    type: String,
    required: true,
    minLength: 6
  },
  tokens: [
    {
      access: {
        type: String,
        required: true
      },
      token: {
        type: String,
        required: true
      }
    }
  ]
});

Users.methods.toJSON = function() {
  const user = this;
  const userObject = user.toObject();
  return _.pick(userObject, ['_id', 'email']);
};

Users.methods.generateAuthToken = function() {
  const user = this;
  const access = 'auth';
  const token = jwt
    .sign({ _id: user._id.toHexString(), access }, 'pranshushah')
    .toString();
  user.tokens = user.tokens.concat([{ access, token }]);
  return user.save().then(() => {
    return token;
  });
};

Users.methods.removeToken = function(token) {
  return this.update({
    $pull: {
      tokens: {
        token
      }
    }
  });
};

Users.pre('save', function(next) {
  const user = this;
  if (user.isModified('password')) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt
        .hash(user.password, salt)
        .then(hash => {
          user.password = hash;
          next();
        })
        .catch(e => Promise.reject(e));
    });
  } else {
    next();
  }
});

Users.plugin(uniqueValidator, { message: '{PATH} already exists!!' });

Users.statics.findByToken = function(token) {
  const User = this;
  let decoded;
  try {
    decoded = jwt.verify(token, 'pranshushah');
  } catch (e) {
    return Promise.reject({ error: e });
  }
  return User.findOne({
    _id: decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  });
};

Users.statics.findByCredentials = function(email, password) {
  const User = this;
  return User.findOne({ email }).then(user => {
    if (!user) {
      return Promise.reject('User not Found, Please SignUp');
    }
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password, (err, res) => {
        if (res) {
          resolve(user);
        } else {
          reject('incorrect email or password');
        }
      });
    });
  });
};

const User = mongoose.model('Users', Users);
module.exports = { User };
