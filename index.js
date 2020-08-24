const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
require('dotenv').config();

// Middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors());

// Database setup
mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
}).then(() => { console.log("Connected to db successfully")})

// Routes Setup
app.use('/api/videogame', require('./routes/videogame'));
app.use('/api/category', require('./routes/category'));
app.use('/api/users', require('./routes/auth'));

const port = process.env.PORT;

// We listen to Port
app.listen(port, () => {
  console.log(`Mern aplication running on port ${port}`)
})