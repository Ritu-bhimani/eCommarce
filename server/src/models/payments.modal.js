const mongoose=require('mongoose')

const paymentsSchema=new mongoose.Schema(
    {
        order_id:{
            type: mongoose.Types.ObjectId,
            ref: "Orders",
            require: true
        },
        type:{
            type:String,
            trim:true,
            require:true,
            lowercase:true,
        },
        status:{
            type:Boolean,
            default: true,
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

const Payments=mongoose.model('Payments',paymentsSchema)

module.exports=Payments;