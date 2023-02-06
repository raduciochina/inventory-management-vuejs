const express = require('express');
const categoryRouter = express.Router();
const categoryController = require('../controllers/category');

categoryRouter.get('/getAll', categoryController.getAllCategories);
categoryRouter.post('/add', categoryController.addCategory);
categoryRouter.delete('/delete/:id', categoryController.deleteCategory);
categoryRouter.put('/edit/:id', categoryController.editCategory);
categoryRouter.get('/:id', categoryController.getCategoryById);

module.exports = categoryRouter;