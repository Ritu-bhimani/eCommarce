const mongoose=require("mongoose")

const SubCategoriesSchema=new mongoose.Schema(
    {
        category_id:{
            type:mongoose.Types.ObjectId,
            ref:"Categories",
            require:true
        },
        name:{
            type:String,
            trim:true,
            require:true,
            lowercase:true,
            unique:true
        },
        description:{
            type:String,
            trim:true,
            require:true,
            lowercase:true,
        },
        photo:{
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

const Subcategories=mongoose.model('Subcategories',SubCategoriesSchema)

module.exports=Subcategories