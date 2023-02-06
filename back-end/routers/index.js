const express = require('express');
const router = express.Router();
const itemRouter = require('./item');
const userRouter = require('./user');
const categoryRouter = require('./category');
const contactRouter = require('./contact');
const dataRouter = require('./chance');

router.use('/items', itemRouter);
router.use('/users', userRouter);
router.use('/categories', categoryRouter);
router.use('/contact', contactRouter);
router.use('/data', dataRouter);

module.exports = router;