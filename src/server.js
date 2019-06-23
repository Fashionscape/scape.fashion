const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

const allItems = require('../data/items.json');
const items = allItems.filter(item => !!item.images.detail);

app.use((req, res, next) => {
  req.items = items;
  next();
});

app.use('/colors', require('./routes/colors'));
app.use('/items', require('./routes/items'));

app.use('/', (req, res) => res.sendStatus(404));

app.use((err, req, res, next) => {
  res.status(400).send({
    success: false,
    message: err.message,
  });
});

module.exports = app;
