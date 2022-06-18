const router = require('express').Router();
const { jwtVerify } = require('../middlewares/jwtVerify.middleware');
const User = require('../models/User.model');
const fileUploader = require('../config/cloudinary.config');

// ************************************************
// GET A USER DETAILS ROUTE
// ************************************************
router.get('/profile/:userID', (req, res, next) => {
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

// ************************************************
// POST Route: SAVE THE CHANGES AFTER EDITING THE PHOTO ROUTE
// ************************************************
router.post('/profile/:userID', jwtVerify, (req, res) => {
    const { username, password, likedposts, role, profilephoto } = req.body;
    console.log({ username });
    User.findByIdAndUpdate(
        req.params.userID,
        { username, password, likedposts, role, profilephoto },
        { new: true }
    )
        .then((updatedUserFromDB) => {
            res.status(201).json(updatedUserFromDB);
        })
        .catch((err) =>
            console.log(
                'Error while saving the updates in the photo to the DB: ',
                err
            )
        );
});

// ************************************************
// POST UPLOAD ROUTE
// ************************************************
router.post('/upload', fileUploader.single('imageUrl'), (req, res, next) => {
    console.log('file is: ', req.file);

    if (!req.file) {
        next(new Error('No file uploaded!'));
        return;
    }

    // Get the URL of the uploaded file and send it as a response.
    // 'fileUrl' can be any name, just make sure you remember to use the same when accessing it on the frontend

    res.json({ fileUrl: req.file.path });
    console.log('uploading');
});
module.exports = router;
