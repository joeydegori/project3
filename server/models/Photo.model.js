const { Schema, model } = require('mongoose');

const photoSchema = new Schema(
    {
        image: { type: String, required: true },
        title: { type: String, required: true },
    },

    {
        timestamps: true,
    }
);

const Photo = model('Photo', photoSchema);
module.exports = Photo;
