const port = 3000
const salts = 10
const secret = 'secret'
const corsOptions = {
  origin: true,
  allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Access-Control-Allow-Methods",
      "Access-Control-Request-Headers",
  ],
  credentials: true,
  enablePreflight: true,
};

let db = [

]

let users = [

]

const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const logger = require('morgan')
// const dbFirestore = getFirestore();
const router = require('./routers/index')
const firebase = require('firebase-admin');

app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())
app.use(logger('dev')); 
app.use("/api", router);

// app.use((req, res, next) => {
//   const token = req.headers.authorization;
//   firebase.auth().verifyIdToken(token)
//     .then(decodedToken => {
//       req.user = decodedToken;
//       next();
//     })
//     .catch(error => {
//       res.status(401).json({ message: 'Unauthorized' });
//     });
// });



app.listen(port, () => {
    console.log(`TIC Project App listening on port ${port}!`)
  });