const topicsRouter = require('express').Router();
const { sendTopics, addTopic } = require('../controllers/topicsControl');

topicsRouter.get('/', sendTopics);
topicsRouter.post('/', addTopic);

module.exports = topicsRouter;
