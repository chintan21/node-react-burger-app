const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const keys = require('./config/keys');

mongoose.connect(
  keys.mongoURI,
  { useNewUrlParser: true }
);

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require('./routes/ingredientsRoutes')(app);
require('./routes/authRoutes')(app);
require('./routes/ordersRoute')(app);

if (process.env.NODE_ENV === 'production') {
  console.log('from react');
  //express will serve up production asset
  //for example main.js or main.css
  app.use(express.static('client/build'));
  //express will serve up index.html if it does
  //if it doesn't recognize the route
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = 5000 || process.env.PORT;
app.listen(PORT, () => console.log('starting port on 5000'));
