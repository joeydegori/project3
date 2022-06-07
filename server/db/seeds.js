const mongoose = require('mongoose');

const Photo = require('../models/Photo.model');

// this is the file where we establish connection with database
require('./index.js');

const photos = [
    {
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Honeycrisp-Apple.jpg/2269px-Honeycrisp-Apple.jpg',
        title: 'Apple',
    },
    {
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Orange-Fruit-Pieces.jpg/1600px-Orange-Fruit-Pieces.jpg?20141112073556',
        title: 'Orange',
    },
    {
        image: 'https://cdn.britannica.com/45/126445-004-90305E10/Kiwi-fruit.jpg?w=400&h=300&c=crop',
        title: 'Kiwi',
    },
];

Photo.create(photos)
    .then((photosFromDB) => {
        // all went good

        photosFromDB.forEach((onePhoto) => {
            console.log(onePhoto.title);
        });

        mongoose.connection.close();
    })
    .catch((err) => console.log(`Error while seeding the database: ${err}`)); // something bad happened
