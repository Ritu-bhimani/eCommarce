const mongoose=require('mongoose')

const shippingsSchema=new mongoose.Schema(
    {
        order_id:{
            type: mongoose.Types.ObjectId,
            ref: "Orders",
            require: true
        },
        carriers:{
            type:String,
            trim:true,
            require:true,
            lowercase:true,
        },
        currant_place:{
            type:String,
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
)

const shippings=mongoose.model('shippings',shippingsSchema)

module.exports=shippings;