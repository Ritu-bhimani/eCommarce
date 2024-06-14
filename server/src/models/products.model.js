const mongoose=require("mongoose")

const productsSchema=new mongoose.Schema(
    {
        category:{
            type:mongoose.Types.ObjectId,
            ref:"Categories",
            require:true
        },
        subcategory:{
            type:mongoose.Types.ObjectId,
            ref:"Subcategories",
            require:true
        },
        name:{
            type:String,
            trim:true,
            require:true,
            lowercase:true,
            unique:true
        },
        price:{
            type:Number,
            require:true,
        },
        description:{
            type:String,
            trim:true,
            require:true,
            lowercase:true,
        },
        image:{
            type:String,
            trim:true,
            require:true,
            lowercase:true,
        }, 
        is_active: {
            type: Boolean,
            default: true,
        }
    },
    {
        timestamps:true,
        versionKey:false
    }
)

const Products=mongoose.model('Products',productsSchema)

module.exports=Products