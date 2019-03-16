const { insertUser, sendUsers, sendUserByUsername } = require('../models/userModels');

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
    .then((usersData) => {
      res.status(200).send({ usersData });
    })
    .catch(next);
};

exports.getUserByUsername = (req, res, next) => {
  const username = req.params.username;
  sendUserByUsername(username)
    .then((userData) => {
      if (userData[0]) {
        res.status(200).send({ userData });
      } else {
        return next({ code: 404, message: 'User not found' });
      }
    })
    .catch(next);
};
