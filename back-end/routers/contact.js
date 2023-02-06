const express = require('express');
const contactRouter = express.Router();
const contactController = require('../controllers/contact');

contactRouter.post('/send-email', contactController.sendEmail);

module.exports = contactRouter;