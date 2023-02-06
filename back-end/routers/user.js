const express = require('express');
const userRouter = express.Router();
const userController = require('../controllers/user');

userRouter.get('/getAll', userController.getAllUsers);

module.exports = userRouter;