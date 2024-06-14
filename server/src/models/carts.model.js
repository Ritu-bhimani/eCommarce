const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema(
    {
        pid: {
            type: mongoose.Types.ObjectId,
            ref: "Products",
            require: true
        },
        quantity: {
            type: Number,
            require: true,
            default: 1,
        }
    }
)

const cartsSchema = new mongoose.Schema(
    {
        user_id: {
            type: mongoose.Types.ObjectId,
            ref: "Carts",
            require: true,
        },
        items: [itemSchema],
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

const Carts = mongoose.model('Carts', cartsSchema)


module.exports = Carts;