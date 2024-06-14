const mongoose = require('mongoose');

const attributesSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            require: true,
            lowercase:true,
        },
        value: {
            type: String,
            require: true,
            lowercase:true,
        },
        stock:{
            type:String,
            require: true,
            lowercase:true,
        }
    }
)

const variantsSchema = new mongoose.Schema(
    {
        pid: {
            type: mongoose.Types.ObjectId,
            ref: "Products",
            require: true,
        },
        attribute: [attributesSchema],
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