const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/colors', require('./routes/colors'));

app.use('/', (req, res) => res.sendStatus(404));

app.use((err, req, res, next) => {
  res.status(400).send({
    success: false,
    message: err.message
  });
});

module.exports = app;
