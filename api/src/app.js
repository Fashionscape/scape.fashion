const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const middleware = require("./middleware");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(middleware);

app.use("/items", require("./items/routes"));

app.use("/", (req, res) => res.sendStatus(404));

app.use((err, req, res, next) => {
  res.status(400).send({
    success: false,
    message: err.message
  });
});

module.exports = app;
