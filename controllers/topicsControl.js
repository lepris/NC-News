const { getAllTopics, postTopic } = require('../models/topicsModel');

exports.sendTopics = (req, res, next) => {
  getAllTopics().then((topics) => {
    res.status(200).send({ topics });
  });
};

exports.addTopic = (req, res, next) => {
  const newTopic = req.body;
  postTopic(newTopic)
    .then((addedTopic) => {
      console.log(addedTopic);
      res.status(201).send(addedTopic);
    })
    .catch((err) => {
      console.error(err.code);
      next(err);
    });
};
