const usersRouter = require('express').Router();
const { postUser, getUsers } = require('../controllers/userControl');

usersRouter
  .route('/')
  .get(getUsers)
  .post(postUser)

  .all((req, res, next) => {
    res.status(405).send({ message: 'Method not allowed' });
  });

module.exports = usersRouter;
