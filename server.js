require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));  // To parse URL-encoded data
app.use(express.json());
app.use(methodOverride('_method'));  // Override with POST having ?_method=DELETE/PUT
app.use(express.static('public'));

// Connect to MongoDB
async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Failed to connect to MongoDB', err);
    }
}

connectDB()

// Routes
const itemsRoute = require('./controllers/item');
app.use('/api', itemsRoute);

// Start the Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
