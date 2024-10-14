// server.js
const express = require('express');
const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB connection URI
const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);
const dbName = 'User_Database';
let db;

// Connect to MongoDB
async function connectDB() {
    try {
        await client.connect();
        db = client.db(dbName);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error);
    }
}

connectDB();

// API for user login
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await db.collection('Users').findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        // Compare the hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Successful login
        return res.status(200).json({ message: 'Login successful' });
    } catch (err) {
        return res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// API for user registration
app.post('/register', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the user already exists
        const existingUser = await db.collection('Users').findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password before saving it to the database
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert the new user into the database
        await db.collection('Users').insertOne({ email, password: hashedPassword });

        // Successful registration
        return res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        return res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// Start the server
const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
