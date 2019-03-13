const { getAllTopics, postTopic } = require('../models/topicsModel');

exports.sendTopics = (req, res, next) => {
  getAllTopics().then((topics) => {
    res.status(200).send({ topics });
  });
};

exports.addTopic = (req, res, next) => {
  console.log('\n\n\n TOPIC Visit in the controller');
  const newTopic = req.body;
  postTopic(newTopic)
    .then(([addedTopic]) => {
      console.log('/////////////CONTROLLER OUTPUT', addedTopic);
      res.status(201).send({ topic: addedTopic });
    })
    .catch((err) => {
      next(err);
    });
};
