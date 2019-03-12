const { insertUser } = require('../models/userModels');

exports.postUser = (req, res, next) => {
  const userData = req.body;
  insertUser(userData)
    .then(([user]) => {
      console.log('hello');
      res.status(201).send({ user });
    });
};
