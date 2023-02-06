const db = require('../config/db');
const admin = require('firebase-admin');

const controller = {
    getAllCategories: async(req, res) => {
        try {
            //get all items for specific user
            const categoriesSnapshot = await db.collection('categories').get();
            const categoriesResponse = [];
            categoriesSnapshot.forEach(doc => {
                categoriesResponse.push({
                    id: doc.id,
                    data: doc.data()
                });
            });
            res.status(200).send(categoriesResponse);
        } catch (err) {
            res.status(500).send({ message: `Server error: ${err}` });
        }
    },
    addCategory: async(req, res) => {
        try {
            const category = {
                ownerId: req.body.ownerId,
                name: req.body.name,
            };
            await db.collection('categories').add(category);
            res.status(201).send({ message: "Category Added!" });
        } catch (err) {
            res.status(500).send({ message: "Server error: " + err });
        }
    },
    deleteCategory: async(req, res) => {
        try {
            await db.collection('categories').doc(req.params.id).delete();
            res.status(200).send({ message: "Category Deleted!" });
        } catch (err) {
            res.status(500).send({ message: "Server error: " + err });
        }
    },
    editCategory: async(req, res) => {
        try{
            await db.collection('categories').doc(req.params.id).update({
                name: req.body.name
            });
            res.status(200).send({ message: "Category Updated!" });
        }
        catch(err){
            res.status(500).send({ message: "Server error: " + err });
        }
    },

    getCategoryById: async(req, res) => {
        try{
            const categorySnapshot = await db.collection('categories').doc(req.params.id).get();
            const categoryResponse = {
                id: categorySnapshot.id,
                data: categorySnapshot.data()
            };
            res.status(200).send(categoryResponse);
        }
        catch(err){
            res.status(500).send({ message: "Server error: " + err });
        }

    }
    


}

module.exports = controller;