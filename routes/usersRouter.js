const usersRouter = require('express').Router();
const { postUser } = require('../controllers/userControl');

usersRouter.get('/', (req, res, next) => {
  res.status(200).send({ greeting: 'Helo from USERS router' });
});
usersRouter.post('/', postUser);

module.exports = usersRouter;
