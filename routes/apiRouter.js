const apiRouter = require('express').Router();
const usersRouter = require('./usersRouter');
const topicsRouter = require('./topicsRouter');
const articlesRouter = require('./articlesRouter');

apiRouter.use('/users', usersRouter);
console.log('*********', topicsRouter);
// apiRouter.use('/topics', topicsRouter);
apiRouter.use('/topics', topicsRouter);
apiRouter.use('/articles', articlesRouter);

module.exports = apiRouter;
