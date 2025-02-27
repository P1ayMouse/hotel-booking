const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const data = require('./db.json');

const app = express();
app.use(cors());
app.use(bodyParser.json());

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
        return res.status(500).json({ error: "Data loading failed!" });
    }

    const hotel = data.hotels.find(hotel => hotel.id === parseInt(id));

    if (!hotel) {
        return res.status(404).json({ error: "Hotel is not found!" });
    }

    res.json(hotel);
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});