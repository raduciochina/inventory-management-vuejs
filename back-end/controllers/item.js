const db = require('../config/db');
const admin = require('firebase-admin');

const controller = {
    getAllItems: async(req, res) => {
        try {
            //get all items for specific user
            const itemsSnapshot = await db.collection('items').get();
            const itemsResponse = [];
            itemsSnapshot.forEach(doc => {
                itemsResponse.push({
                    id: doc.id,
                    data: doc.data()
                });
            });
            res.status(200).send(itemsResponse);
        } catch (err) {
            res.status(500).send({ message: `Server error: ${err}` });
        }
    },
    addItem: async(req, res) => {
        const categoryRef = db.doc(`${req.body.category}`);
        try {
            const item = {
                ownerId: req.body.ownerId, 
                name: req.body.name,
                price: req.body.price,
                description: req.body.description,
                quantity: req.body.quantity,
                category: categoryRef,
            };
            await db.collection('items').add(item);
            res.status(201).send({ message: "Item Added!" });
        } catch (err) {
            res.status(500).send({ message: "Server error: " + err });
        }
    },
    deleteItem: async(req, res) => {
        try {
            await db.collection('items').doc(req.params.id).delete();
            res.status(200).send({ message: "Item Deleted!" });
        } catch (err) {
            res.status(500).send({ message: "Server error: " + err });
        }
    },
    getAllByCategory: async(req, res) => {
        console.log(req.params.id)
        try {            
            console.log(req.params.id)
            // const itemsSnapshot = await db.collection('items').whereEqualTo('category', req.params.categoryId).get();
            const itemsSnapshot = await db.collection("items").where("category", "==", 
            db.collection("categories").doc(req.params.id)).get();
            // const itemsSnapshot = await db.collection("items").where("category", "==", db.doc(req.query.id)).get();
            const itemsResponse = [];
            itemsSnapshot.forEach(doc => {
                itemsResponse.push({
                    id: doc.id,
                    data: doc.data()
                });
            });
            res.status(200).send(itemsResponse);
        } catch (err) {
            res.status(500).send({ message: `Server error: ${err}` });
        }
    },
    editItem: async(req, res) => {
        const categoryRef = db.doc(`${req.body.category}`);
        try {
            const item = {
                ownerId: req.body.ownerId, 
                name: req.body.name,
                price: req.body.price,
                description: req.body.description,
                quantity: req.body.quantity,
                category: categoryRef,
            };
            await db.collection('items').doc(req.params.id).update(item);
            res.status(201).send({ message: "Item Updated!" });
        } catch (err) {
            res.status(500).send({ message: "Server error: " + err });
        }
    },
    getItemById: async(req, res) => {
        try {
            const item = await db.collection('items').doc(req.params.id).get();
            if (!item.exists) {
                res.status(404).send({ message: 'Item not found!' });
            } else {
                res.status(200).send(item.data());
            }
        } catch (err) {
            res.status(500).send({ message: `Server error: ${err}` });
        }
    }

}

module.exports = controller;