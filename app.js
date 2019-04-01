const express = require('express');

const {
  handle200, handle400, handle500, handle404, handle422,
} = require('./error');

const app = express();
const bodyParser = require('body-parser');
const apiRouter = require('./routes/apiRouter');
const { PORT = 9090 } = process.env;

app.listen(PORT, () => console.log(`listening on ${PORT}`));
app.use(bodyParser.json());

app.use('/api', apiRouter);

app.all((req, res, next) => {
  res.status(405).send({ message: 'Method not allowed' });
});

app.all('/*', (req, res, next) => {
  res.status(404).send({ message: 'Route not found' });
});

// other ERROR handling middleware
app.use(handle200);
app.use(handle400);
app.use(handle404);
app.use(handle422);


module.exports = app;
