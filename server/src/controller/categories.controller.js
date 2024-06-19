const Categories = require('../models/categories.modal');
const uploadfile = require('../utils/cloudinary');

const listCategories = async (req, res) => {
    try {
        const categories = await Categories.find()
        if (!categories || categories.length === 0) {
            res.status(404).json({
                success: false,
                message: "No categories found",
            })
        }

        res.status(200).json({
            success: true,
            message: "Categories Data fetched.",
            data: categories

        });
    } catch (error) {
        res.status(500).json({
            succsess: false,
            error: 'internal network error' + error.message
        });
    }

}


const getCategory = async (req, res) => {
    try {
        const category = await Categories.findById(req.params.id)

        if (!category) {
            res.status(404).json({
                success: false,
                message: "Category not found"
            })
        }

        res.status(200).json({
            success: true,
            message: "Category Data fetched.",
            data: category
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server Error" + error.message
        })
    }

}
const addCategory = async (req, res) => {
    try {
        // console.log(req.file);
        // console.log(req.body, "LLLLLLL");

        const fileRes = await uploadfile(req.file.path, "category")
        // console.log(fileRes);

        const category = await Categories.create({
            ...req.body,
            image: {
                public_id: fileRes.public_id,
                url: fileRes.url
            }
        })
        // const category = new Categories(req.body);
        // await category.save();

        if (!category) {
            res.status(400).json({
                success: false,
                message: "can not create category",
            })
        }

        res.status(201).json({
            success: true,
            message: "Category added successfully",
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Interal server error",
        })
    }

}
const deleteCategory = async (req, res) => {

    try {
        // const deleteCategory= await Categories.deleteOne({_id: req.params.id})
        const deleteCategory = await Categories.findByIdAndDelete(req.params.id)
        // const deleteCategory = await Categories.findOneAndRemove(req.params.id)

        if (!deleteCategory) {
            res.status(404).json({
                success: false,
                message: "missing Category id"
            })
        }

        res.status(200).json({
            success: true,
            message: "Category deleted.",
            // data:category
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server Error" + error.message
        })
    }
}
const putCategory = async (req, res) => {
    try {
        console.log(req.body);

        if (req.file) {
            console.log(req.file, "new upadate");
            const fileRes = await uploadfile(req.file.path, "category")

            const category = await Categories.findByIdAndUpdate(req.params.id, {
                ...req.body,
                image: {
                    public_id: fileRes.public_id,
                    url: fileRes.url
                }
            }, { new: true, runValidators: true }
            )
            console.log(category, "new upadate");
            if (!category) {
                res.status(400).json({
                    success: false,
                    message: "Category data not found"
                })
            }
            res.status(200).json({
                success: true,
                message: "Category updated.",
                data: category
            })
        } else {

            console.log("old category");
            const category = await Categories.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
            if (!category) {
                res.status(400).json({
                    success: false,
                    message: "Category data not found"
                })
            }
            res.status(200).json({
                success: true,
                message: "Category updated.",
                data: category
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server Error" + error.message
        })
    }

}
module.exports = {
    listCategories,
    addCategory,
    deleteCategory,
    getCategory,
    putCategory,
}