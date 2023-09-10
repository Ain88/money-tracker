const express = require('express');
const cors = require('cors');
require('dotenv').config();
const Transaction = require('./models/Transaction.js');
const mongoose = require('mongoose');
const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/test', (req, res) => {
  res.json({ body: 'test ok' });
});

app.post('/api/transaction', async (req, res) => {
  try {
    console.log('Connecting to MongoDB...');
    // Connect to MongoDB using the MONGO_URL from .env
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB successfully.');

    // Extract data from the request body
    const { name, description, datetime, price } = req.body;
    console.log('Received data:', { name, description, datetime, price });

    // Create a new transaction
    const transaction = await Transaction.create({
      name,
      description,
      datetime,
      price,
    });
    console.log('Transaction created:', transaction);

    // Send the response
    res.json(transaction);
  } catch (error) {
    // Handle errors and close the MongoDB connection
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  } finally {
    // Always close the MongoDB connection after the request is handled
    mongoose.connection.close();
    console.log('MongoDB connection closed.');
  }
});

const port = process.env.PORT || 4000;

app.get('/api/transactions', async (req, res) => {
  await mongoose.connect(process.env.MONGO_URL);
  const transactions = await Transaction.find();
  res.json(transactions);
})

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
