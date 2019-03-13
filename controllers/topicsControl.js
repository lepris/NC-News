const { getAllTopics, postTopic } = require('../models/topicsModel');

exports.sendTopics = (req, res, next) => {
  getAllTopics().then((topics) => {
    res.status(200).send({ topics });
  });
};

exports.addTopic = (req, res, next) => {
  console.log('\n\n\n %%%%%%%%% Visit in the controller');
  const newTopic = req.body;
  postTopic(newTopic)
    .then((addedTopic) => {
      console.log(addedTopic);
      const [result] = addedTopic;
      res.status(201).send({ topic: result });
    })
    .catch((err) => {
      next(err);
    });
};
