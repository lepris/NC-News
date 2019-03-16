const usersRouter = require('express').Router();
const { postUser, getUsers, getUserByUsername } = require('../controllers/userControl');

usersRouter
  .route('/')
  .get(getUsers)
  .post(postUser)
  .all((req, res, next) => {
    res.status(405).send({ message: 'Method not allowed' });
  });

usersRouter
  .route('/:username')
  .get(getUserByUsername)
  .all((req, res, next) => {
    res.status(405).send({ message: 'Method not allowed' });
  });

module.exports = usersRouter;
