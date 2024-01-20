const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3060;

// Connect to MongoDB (replace 'your_database_uri' with your MongoDB URI)
mongoose.connect('your_database_uri', { useNewUrlParser: true, useUnifiedTopology: true });

// Create a mongoose schema and model
const BookingSchema = new mongoose.Schema({
  name: String,
  phone: String,
  time: String,
  cabang: String,
  date: String,
  number: Number,
  message: String,
});

const Booking = mongoose.model('Booking', BookingSchema);

// Middleware to parse incoming requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve the HTML form
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html'); // Create an HTML file with your form
});

// Handle form submissions
app.post('/submit', async (req, res) => {
  try {
    const { bb-name, bb-phone, bb-time, bb-cabang, bb-date, bb-number, bb-message } = req.body;

    const newBooking = new Booking({
      name: bb-name,
      phone: bb-phone,
      time: bb-time,
      cabang: bb-cabang,
      date: bb-date,
      number: bb-number,
      message: bb-message,
    });

    await newBooking.save();

    res.status(200).json({ message: 'Booking successful!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
