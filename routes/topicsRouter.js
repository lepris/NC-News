const topicsRouter = require('express').Router();
const { sendTopics, addTopic } = require('../controllers/topicsControl');


topicsRouter
  .route('/')
  .get(sendTopics)
  .post(addTopic)
  .all((req, res, next) => {
    res.status(404).send({ msg: 'Route not found' });
  });


module.exports = topicsRouter;
