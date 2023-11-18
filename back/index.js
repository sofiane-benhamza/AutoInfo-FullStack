const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/autoinfo', { useNewUrlParser: true, useUnifiedTopology: true });

// Define a schema for the 'cars' collection
const carSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    model: { type: String, required: true },
    type: { type: String, required: true },
    make: { type: String, required: true },
    year: { type: Number, required: true },
});

// Create a model for the 'cars' collection
const Car = mongoose.model('Car', carSchema);



app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Define routes for the API
app.get('/getcars', async (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    try {
    const cars = await Car.find();
    res.json(cars);
  } catch (err) {
    console.error(err);
    res.status(500).send('An error occurred');
  }
});

app.post('/setcars', async (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    try {
    const car = new Car(req.body);
    await car.save();
    res.status(201).send('Car saved successfully');
  } catch (err) {
    console.error(err);
    res.status(500).send('An error occurred');
  }
});

// Start the server
app.listen(3001, () => {
  console.log('Server started on port 3001');
});
