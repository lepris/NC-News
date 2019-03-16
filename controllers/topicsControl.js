const { getAllTopics, postTopic } = require('../models/topicsModel');

exports.sendTopics = (req, res, next) => {
  getAllTopics().then((topics) => {
    res.status(200).send({ topics });
  })
    .catch(next);
};

exports.addTopic = (req, res, next) => {
  const newTopic = req.body;
  postTopic(newTopic)
    .then(([addedTopic]) => {
      res.status(201).send({ topic: addedTopic });
    })
    .catch(next);
};
