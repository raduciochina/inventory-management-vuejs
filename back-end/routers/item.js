const express = require('express');
const itemRouter = express.Router();
const itemController = require('../controllers/item');

itemRouter.get('/getAll', itemController.getAllItems);
itemRouter.post('/add', itemController.addItem);
itemRouter.delete('/delete/:id', itemController.deleteItem);
itemRouter.get('/getAllByCategory/:id', itemController.getAllByCategory);
itemRouter.put('/edit/:id', itemController.editItem);
itemRouter.get('/:id', itemController.getItemById);

module.exports = itemRouter;