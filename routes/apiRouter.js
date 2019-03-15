const apiRouter = require('express').Router();
const usersRouter = require('./usersRouter');
const topicsRouter = require('./topicsRouter');
const articlesRouter = require('./articlesRouter');

apiRouter.use('/users', usersRouter);
console.log('*********', topicsRouter);
// apiRouter.use('/topics', topicsRouter);
apiRouter.use('/topics', topicsRouter);
apiRouter.use('/articles', articlesRouter);


apiRouter.all((req, res, next) => {
  res.status(405).send({ message: 'Method not allowed' });
});


module.exports = apiRouter;
