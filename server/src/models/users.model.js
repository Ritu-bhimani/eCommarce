const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            require: true,
            lowercase: true,
            unique: true
        },
        address: {
            type: String,
            trim: true,
            require: true,
            lowercase: true,
        },
        email: {
            type: String,
            trim: true,
            require: true,
            lowercase: true,
        },
        passward:{
            type: String,
            trim: true,
            require: true,
            lowercase: true,
            unique: true
        },
        mobile_no:{
            type: Number,
            trim: true,
            require: true,
            lowercase: true,
        },
        role:{
            type: String,
            trim: true,
            require: true,
            lowercase: true,  
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

const Users = mongoose.model('Users', usersSchema)


module.exports = Users;