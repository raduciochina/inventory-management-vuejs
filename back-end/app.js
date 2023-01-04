const port = 3000
const salts = 10
const secret = 'secret'

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


app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())
app.use(logger('dev')); 

app.get('/', async (req, res) => {
    res.status(200);
    res.send('TIC Project');
  });



app.listen(port, () => {
    console.log(`TIC Project App listening on port ${port}!`)
  });