const router = require('express').Router();
const { jwtVerify } = require('../middlewares/jwtVerify.middleware');
const Photo = require('../models/Photo.model');
const User = require('../models/User.model');

// ************************************************
// GET ALL PHOTOS ROUTE
// ************************************************
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

router.get('/addphotos', (req, res, next) => {});

// ************************************************
// POST Route: SAVE THE CHANGES AFTER EDITING THE PHOTO ROUTE
// ************************************************
router.post('/photos/:photoID', (req, res) => {
    const { title, image } = req.body;

    Photo.findByIdAndUpdate(req.params.photoID, { title, image }, { new: true })
        .then((updatedPhotoFromDB) => {
            res.status(201).json(updatedPhotoFromDB);
        })
        .catch((err) =>
            console.log(
                'Error while saving the updates in the photo to the DB: ',
                err
            )
        );
});

// ************************************************
// GET A PHOTO DETAILS ROUTE
// ************************************************
router.get('/photos/:photoId', (req, res, next) => {
    Photo.findById(req.params.photoId)
        .then((photoFromDB) => {
            res.status(200).json(photoFromDB);
        })
        .catch((err) =>
            console.log(
                'Error while getting a photo details from the DB: ',
                err
            )
        );
});

module.exports = router;
