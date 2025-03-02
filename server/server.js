const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');


const fs = require('fs');
const path = require('path');
const dataPath = path.join(__dirname, './users-db.json');

const data = require('./db.json');
const users = require('./users-db.json').users;

require('dotenv').config();
const secretKey = process.env.JWT_SECRET;

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

app.post('/register', (req, res) => {
    const { username, email, password, age, gender } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ error: 'required_fields_not_filled' });
    }

    const userExists = users.find(user => user.email === email);
    if (userExists) {
        return res.status(400).json({ error: 'user_exists' });
    }

    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
            return res.status(500).json({ error: 'password_hashing_trouble' });
        }

        const newUser = {
            id: uuidv4(),
            username,
            email,
            password: hashedPassword,
            age,
            gender,
            reservedHotels: [],
            likedHotels: [],
        };

        users.push(newUser);
        const updatedData = { users };

        fs.writeFile(dataPath, JSON.stringify(updatedData, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ error: 'registration_troubles' });
            }
            res.status(201).json({ message: 'registration_successful', newUser });
        });
    });
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'enter_email_and_password' });
    }

    const user = users.find(user => user.email === email);
    if (!user) {
        return res.status(401).json({ error: 'incorrect_user_data' });
    }

    bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) {
            return res.status(500).json({ error: 'password_comparison_error' });
        }
        if (!isMatch) {
            return res.status(401).json({ error: 'incorrect_user_data' });
        }

        const token = jwt.sign({ id: user.id, email: user.email }, secretKey, { expiresIn: '1h' });
        res.json({ message: 'login_successful', token });
    });
});

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ error: 'authorization_token_missing' });

    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'invalid_token' });
        }
        req.user = user;
        next();
    });
}

app.get('/profile', authenticateToken, (req, res) => {
    const user = users.find(user => user.id === req.user.id);
    if (!user) return res.status(404).json({ error: 'user_not_found' });
    res.json({ username: user.username, email: user.email });
});

app.get('/destination', (req, res) => {
    res.json(data.destination);
});

app.get('/hotels', (req, res) => {
    res.json(data.hotels);
});

app.post('/hotels', (req, res) => {
    const { city } = req.body;
    const hotels = data.hotels.filter((hotel) => hotel.city === city);
    res.json(hotels);
});

app.get("/hotels/hotel/:id", (req, res) => {
    const { id } = req.params;

    if (!data || !data.hotels) {
        return res.status(500).json({ error: 'data_loading_failed' });
    }

    const hotel = data.hotels.find(hotel => hotel.id === parseInt(id));
    if (!hotel) {
        return res.status(404).json({ error: 'hotel_not_found' });
    }
    res.json(hotel);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
