const router = require('express').Router();
const { jwtVerify } = require('../middlewares/jwtVerify.middleware');
const Photo = require('../models/Photo.model');
const User = require('../models/User.model');
const fileUploader = require('../config/cloudinary.config');
const { adminVerify } = require('../middlewares/jwtVerify.middleware');

// ************************************************
// GET ALL PHOTOS ROUTE
// ************************************************
router.get('/photos', jwtVerify, (req, res, next) => {
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

// ************************************************
// CREATE A NEW PHOTO ROUTE
// ************************************************
router.post('/photos/newphoto', jwtVerify, (req, res) => {
    const { title, imageUrl } = req.body;

    Photo.create({ title, imageUrl })
        .then((newSavedPhotoFromDB) => {
            res.status(200).json(newSavedPhotoFromDB);
        })
        .catch((err) =>
            console.log('Error while saving a new photo in the DB: ', err)
        );
});

// ************************************************
// Get Liked Posts ROUTE
// ************************************************
router.get('/photos/getLikedPosts', jwtVerify, (req, res) => {
    User.findById(req.user._id)
        .populate('likedposts')
        .select({ likedposts: 1 })
        .then((likedposts) => {
            res.status(200).json(likedposts);
        })
        .catch((err) =>
            console.log('Error while saving a new photo in the DB: ', err)
        );
});

// ************************************************
// POST Route: FOR LIKED POSTS
// ************************************************
router.post('/photos/likedposts', jwtVerify, async (req, res, next) => {
    const { userID, photoID } = req.body;
    console.log(userID, photoID);
    try {
        const user = await User.findByIdAndUpdate(
            userID,
            {
                $addToSet: { likedposts: photoID },
            },
            { new: true }
        );

        // Save the photo to the user's library if it's not already there
        // if (!user.like.some((likedposts) => photoId === likedposts.id)) {
        //     user.photo.push(photo);
        //     await user.save();
        // }
        console.log(user);
        res.status(200).json(user);
    } catch (e) {
        console.error(e);
    }
});

// ************************************************
// POST Route: FOR DISLIKE POSTS
// ************************************************
router.post('/photos/deleteposts', jwtVerify, async (req, res, next) => {
    const { userID, photoID } = req.body;
    console.log(userID, photoID);
    try {
        const user = await User.findByIdAndUpdate(
            userID,
            {
                $pull: { likedposts: photoID },
            },
            { new: true }
        );

        console.log(user);
        res.status(200).json(user);
    } catch (e) {
        console.error(e);
    }
});

// ************************************************
// POST Route: SAVE THE CHANGES AFTER EDITING THE PHOTO ROUTE
// ************************************************
router.post('/photos/:photoID', jwtVerify, (req, res) => {
    const { title, imageUrl } = req.body;
    console.log({ imageUrl });
    Photo.findByIdAndUpdate(
        req.params.photoID,
        { title, imageUrl },
        { new: true }
    )
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
router.get('/photos/:photoId', jwtVerify, (req, res, next) => {
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

// ************************************************
// POST Route: DELETE THE Photo ROUTE
// ************************************************
router.delete('/photos/:photoID', jwtVerify, (req, res) => {
    Photo.findByIdAndDelete(req.params.photoID)
        .then(() =>
            res.status(200).json({ message: 'Photo deleted successfully' })
        )
        .catch((err) =>
            console.log('Error while deleting a photo from the DB: ', err)
        );
});

module.exports = router;
