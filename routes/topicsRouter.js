const topicsRouter = require('express').Router();
const { sendTopics, addTopic } = require('../controllers/topicsControl');


topicsRouter
  .route('/')
  .get(sendTopics)
  .post(addTopic)
  .all((req, res, next) => {
    res.status(405).send({ message: 'Method not allowed' });
  });


module.exports = topicsRouter;
