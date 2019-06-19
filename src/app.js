const app = require('./server.js');

app.listen(8000, (err) => {
  if (err) console.log(err);
  console.log('App started!');
});
