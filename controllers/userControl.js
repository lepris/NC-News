const { insertUser, sendUsers } = require('../models/userModels');

exports.postUser = (req, res, next) => {
  const userData = req.body;
  insertUser(userData)
    .then(([user]) => {
      res.status(201).send({ user });
    })
    .catch(next);
};

exports.getUsers = (req, res, next) => {
  sendUsers()
    .then((userData) => {
      res.status(200).send(userData);
    })
    .catch(next);
};
