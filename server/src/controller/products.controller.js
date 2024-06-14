const Product = require('../models/products.model')

const listProducts = async (req, res) => {
    try {
        const products = await Product.find()
        .populate({ path: 'category', select: 'name' })
        .populate({ path: 'subcategory', select: 'name' })
        if (!products || products.length === 0) {
            res.status(400).json({
                success: false,
                message: "No products found",
            })
        }
        res.status(200).json({
            success: true,
            message: "Get Products List",
            data: products
        })

    } catch (error) {
        res.status(400).json({
            success: false,
            message: "No products found" + error.message,
        })
    }
}
const getproduct = async (req, res) => {
    try {
        const products = await Product.findById(req.params.id)
        if (!products || products.length === 0) {
            res.status(400).json({
                success: false,
                message: "No products found",
            })
        }
        res.status(200).json({
            success: true,
            message: "Get Products List",
            data: products
        })

    } catch (error) {
        res.status(400).json({
            success: false,
            message: "No products found" + error.message,
        })
    }
}

const addProducts = async(req, res) => {
    try {
        const products = await Product.create(req.body)

        // const products = new Categories(req.body);
        // await products.save();

        if (!products) {
            res.status(400).json({
                success: false,
                message: "can not create Product",
            })
        }

        res.status(201).json({
            success: true,
            message: "Product added successfully",
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Interal server error",
        })
    }
}
const editProducts = async(req, res) => {
    try {
        // console.log(req.params.id, req.body);
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        if (!product) {
            res.status(400).json({
                success: false,
                message: "Product data not found"
            })
        }
        res.status(200).json({
            success: true,
            message: "Product updated.",
            data: product
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server Error" + error.message
        })
    }
}
const deleteProducts = async(req, res) => {
    try {
        const products = await Product.findByIdAndDelete(req.params.id)
        if (!products || products.length === 0) {
            res.status(400).json({
                success: false,
                message: "No products found",
            })
        }
        res.status(200).json({
            success: true,
            message: "Delete Products List",
            data: products
        })

    } catch (error) {
        res.status(400).json({
            success: false,
            message: "No products found" + error.message,
        })
    }
}

module.exports = {
    listProducts,
    addProducts,
    editProducts,
    deleteProducts,
    getproduct,
}