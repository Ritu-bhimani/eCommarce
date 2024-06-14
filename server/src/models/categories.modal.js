const mongoose = require('mongoose');


const categoriesSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
            lowercase: true,
            unique: true,
        },
        description: {
            type: String,
            lowercase: true,
            trim: true,
            required: true,
        },
        image: {
            type: {
                public_id:String,
                url:String,
            }
        },
        is_Active: {
            type: Boolean,
            default: true,
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

const Categories = mongoose.model('Categories', categoriesSchema)


module.exports = Categories;