const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://ritubhimani:abcd123@cluster0.kfn5bgb.mongodb.net/eCommerce')
            .then(() => console.log("mongodb connection succsessfully"))
            .catch((error) => console.log("databaseError:", error))
    } catch (error) {
        console.log("databaseError:", error)
    }
}
module.exports=connectDB