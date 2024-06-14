const mongoose = require('mongoose');

const itemsSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            require: true,
            lowercase:true,
        },
        quantity: {
            type: Number,
            require: true,
            lowercase:true,
        }
    }
)

const variantsSchema = new mongoose.Schema(
    {
        saller_id: {
            type: mongoose.Types.ObjectId,
            ref: "Users",
            require: true,
        },
        shipping_address:{
            type:String,
            trim:true,
            require:true,
            lowercase:true,
        },
        amount:{
            type:Number,
            trim:true,
            require:true,
            lowercase:true,
        },
        items: [itemsSchema],
        discount:{
            type:Number,
            trim:true,
            require:true,
            lowercase:true,
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

const Variants = mongoose.model('variants', variantsSchema)


module.exports = Variants;