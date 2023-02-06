const db = require('../config/db');
const admin = require('firebase-admin');

const controller = {
    getAllUsers: async(req, res) => {
        try {
            admin.auth().listUsers()
            .then((listUsersResult) => {
              listUsersResult.users.forEach((userRecord) => {
                console.log('user', userRecord.toJSON());
              });
            })            
            res.status(200).send();
        } catch (err) {
            res.status(500).send({ message: `Server error: ${err}` });
        }
    },
}

module.exports = controller;