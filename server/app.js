// app.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require("path");

const app = express();
const port = 8080;

app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/wedease', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to the database');
    // Start the server after successfully connecting to the database
    app.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to the database', error);
  });
  app.use('/images',express.static("uploads"));
  
// Import and use the routes
const registerRoutes = require('./routes/register');
const loginRoutes = require('./routes/login');
const workerRoutes= require('./routes/newworker');
const workerloginRoutes= require('./routes/workerlogin');
const fetchworkerRoutes= require('./routes/fworker')
const addressRoutes = require('./routes/addressData');
const paymentRoutes = require('./routes/paymentRoutes');

app.use('/wedease', registerRoutes);
app.use('/wedease', loginRoutes);
app.use('/wedease', workerRoutes);
app.use('/wedease', workerloginRoutes);
app.use( fetchworkerRoutes);
app.use('/wedease', addressRoutes);
app.use('/wedease', paymentRoutes);

