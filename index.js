const express = require('express');
const rooms = require('./rooms');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/rooms', function(req, res) {
    rooms.List(null, function(err, data) {
        if (err) {
            console.error(err);
            res.send(500).send({ error: 'something failed :('});
        } else {
            res.json(data.results)
        }
    });
});

app.post('/rooms', function(req, res) {
    const { available, n_of_beds, numeration, n_of_bathrooms } = req.body;
    console.log(req.body)
    rooms.Create(req.body, function(err, data) {
        if (err) {
            console.log(err);
            res.send(500).send({ error: 'something failed :('});
        } else {
            res.json(data)
        }
    });
});

app.listen(3000, function() {
    console.log('Controller Service running on port 3000');
})