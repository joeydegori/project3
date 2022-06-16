const router = require('express').Router();
const { jwtVerify } = require('../middlewares/jwtVerify.middleware');
const Photo = require('../models/Photo.model');
const User = require('../models/User.model');
const fileUploader = require('../config/cloudinary.config');

// ************************************************
// GET A USER DETAILS ROUTE
// ************************************************
router.get('/profile/:userId', (req, res, next) => {
    User.findById(req.params.userId)
        .then((userFromDB) => {
            res.status(200).json(userFromDB);
        })
        .catch((err) =>
            console.log(
                'Error while getting a photo details from the DB: ',
                err
            )
        );
});

module.exports = router;
