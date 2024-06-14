const mongoose = require('mongoose');


const ratingsSchema = new mongoose.Schema(
    {
        pid: {
            type: mongoose.Types.ObjectId,
            ref: "Products",
            require: true
        },
        user_id: {
            type: mongoose.Types.ObjectId,
            ref: "Users",
            require: true
        },
        rating: {
            type: Number,
            trim: true,
            require: true,
            lowercase: true,
        },
        review: {
            type: String,
            lowercase: true,
            trim: true,
            require: true,
        },
        is_active: {
            type: boolean,
            default: true,
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

const Ratings = mongoose.model('Ratings', ratingsSchema)


module.exports = Ratings;