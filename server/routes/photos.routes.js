const router = require('express').Router();
const { jwtVerify } = require('../middlewares/jwtVerify.middleware');
const Photo = require('../models/Photo.model');
const User = require('../models/User.model');

router.get('/photos', (req, res, next) => {
    Photo.find()
        .then((allPhotosFromDB) => {
            res.status(200).json(allPhotosFromDB);
        })
        .catch((err) => {
            console.log(
                'An error occurred while getting all other photos from DB: ',
                err
            );
            res.status(500).json({ message: 'Can not connect' });
        });
});

module.exports = router;
