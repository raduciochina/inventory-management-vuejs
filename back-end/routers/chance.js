const express = require('express');
const dataRouter = express.Router();
const dataController = require('../config/chance');

dataRouter.get('/generate-data', dataController.generateData);

module.exports = dataRouter;