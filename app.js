const express = require('express');

const { handle400, handle500, handle404 } = require('./error');

const app = express();
const bodyParser = require('body-parser');
const apiRouter = require('./routes/apiRouter');

app.use(bodyParser.json());

app.use('/api', apiRouter);

app.all('/*', (req, res, next) => {
  res.status(404).send({ message: 'Route not found' });
});

// other ERROR handling middleware
app.use(handle400);
app.use(handle404);


module.exports = app;
