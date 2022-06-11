const { Schema, model } = require('mongoose');

const photoSchema = new Schema(
    {
        title: { type: String, required: true },
        imageUrl: { type: String, required: true },
    },

    {
        timestamps: true,
    }
);

const Photo = model('Photo', photoSchema);
module.exports = Photo;
