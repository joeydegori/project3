const { Schema, model } = require('mongoose');

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
        },
        password: String,
        //YOU commented VV this because you don't have a like context yet or an admin role yet

        likedposts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Photo',
            },
        ],
        // //By using enum, user can have only two types of role.
        role: {
            type: String,
            enum: ['admin', 'users'],
            default: 'users',
        },
        imageUrl: { type: String },
    },
    {
        // this second object adds extra properties: `createdAt` and `updatedAt`
        timestamps: true,
    }
);

const User = model('User', userSchema);

module.exports = User;
