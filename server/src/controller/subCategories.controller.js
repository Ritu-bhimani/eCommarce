const mongoose = require('mongoose');
const Subcategories = require('../models/subCategories.model')

const listSubCategories = async (req, res) => {
    try {
        const subCategories = await Subcategories.find()
        // console.log(subCategories);
        if (!subCategories || subCategories.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No categories found",
            });
        }
        res.status(200).json({
            success: true,
            message: "sub Categories Data fetched.",
            data: subCategories
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Internal network error' + error.message
        });
    }
};
const getSubCategory = async (req, res) => {
    try {
        // console.log(req.params.id);
        const subCategory = await Subcategories.findById(req.params.id)

        if (!subCategory) {
            return res.status(404).json({
                success: false,
                message: "Category not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Category Data fetched.",
            data: subCategory
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server Error" + error.message
        });
    }
}
const getCategories = async (req, res) => {
    try {
        // console.log(req.params.category_id);
        const category = await Subcategories.find({ category_id: req.params.category_id })
        // console.log(req.params.category_id,"PPPP");

        // console.log(category);

        // if (!category || category.length === 0) {
        //     res.status(404).json({
        //         success: false,
        //         message: "No categories found" ,
        //     })
        // }

        res.status(200).json({
            success: true,
            message: "Categories Data fetched.",
            data: category

        });
    } catch (error) {
        res.status(500).json({
            succsess: false,
            error: 'internal network error' + error.message
        });
    }

}
const addSubCategories = async (req, res) => {
    try {
        const category = await Subcategories.create(req.body)

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
const deleteSubCategories = async (req, res) => {
    try {
        // console.log(req.params);
        const deleteCategory = await Subcategories.deleteOne({ _id: req.params.id })
        // const deleteCategory= await Categories.findByIdAndDelete(req.params.id)
        // const deleteCategory = await Subcategories.findOneAndRemove(req.params.id)

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
const editSubCategories = async (req, res) => {
    try {
        // console.log(req.params.id, req.body);
        const category = await Subcategories.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
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
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server Error" + error.message
        })
    }

}
const countActiveSubcategories = async (req, res) => {
    try {
        const countActiveSubcategories = await Subcategories.aggregate([
            { $match: { is_active: true } },
            { $group: { _id: null, count: { $sum: 1 } } }
        ]);
        console.log(countActiveSubcategories);

        res.status(200).json({
            success: true,
            message: "Categories Data fetched.",
            data: res.json(countActiveSubcategories)

        });
    } catch (error) {
        res.status(500).json({
            succsess: false,
            error: 'internal network error' + error.message
        });
    }
}
const countInactiveSubcategories = async (req, res) => {
    try {
        const countInactiveSubcategories = await Subcategories.aggregate([
            { $match: { is_active: false } },
            { $group: { _id: null, count: { $sum: 1 } } }
        ]);
        console.log(countInactiveSubcategories);

        res.status(200).json({
            success: true,
            message: "Categories Data fetched.",
            data: res.json(countInactiveSubcategories)

        });
    } catch (error) {
        res.status(500).json({
            succsess: false,
            error: 'internal network error' + error.message
        });
    }
}
const countProducts = async (req, res) => {
    try {
        const countProducts = await Subcategories.aggregate(
            [
                {
                    $lookup: {
                        from: "products",
                        localField: "_id",
                        foreignField: "subcategory",
                        as: "TotalProducts"
                    }
                },
                {
                    $unwind: {
                        path: "$TotalProducts",
                    }
                },
                {
                    $group: {
                        _id: "$TotalProducts.subcategory",
                        "Subcategory":
                        {
                            $first: "$name"
                        },
                        "TotalProducts": {
                            $sum: 1
                        }
                    }
                }
            ]
        );
        res.status(200).json({
            success: true,
            message: "sub Categories Data fetched.",
            data: res.json(countProducts)
        });
    } catch (error) {
        console.log("PPPPPPPPP");
        res.status(500).json({
            success: false,
            error: 'Internal network error' + error.message
        });
    }
}
const parentOfSubcategory = async (req, res) => {
    console.log("PPPPPPPPPmmmmm", req.params.category_id);
    try {
        const countProducts = await Subcategories.aggregate([
            {
                $match: { category_id: new mongoose.Types.ObjectId(req.params.category_id) }
            },
            {
                $lookup: {
                    from: "categories",
                    localField: "category_id",
                    foreignField: "_id",
                    as: "categories"
                }
            },
            {
                $unwind: "$categories",
            },
            {
                $group: {
                    _id: "$categories._id",
                    name: {
                        $first: "$categories.name"
                    },
                    "subcategoryName": { $push: "$name" }
                }
            }
        ]);
        console.log(countProducts);
        res.status(200).json({
            success: true,
            message: "Subcategories data fetched.",
            data: countProducts
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Internal network error: ' + error.message
        });
    }
};
const mostProducts = async (req, res) => {
    try {
        const mostProducts = await Subcategories.aggregate(
            [
                {
                    $lookup: {
                        from: "products",
                        localField: "_id",
                        foreignField: "subcategory",
                        as: "products"
                    }
                },
                {
                    $unwind: "$products",
                },
                {
                    $group: {
                        _id: "$_id",
                        name: {
                            $first: "$name"
                        },
                        "productyName": { $push: "$products.name" },
                        count: {
                            $sum: 1
                        }
                    },
                },
                {
                    $sort: {
                        count: -1
                    }
                },
                {
                    $limit: 3
                }
            ]);
        console.log(mostProducts);
        res.status(200).json({
            success: true,
            message: "Subcategories data fetched.",
            data: mostProducts
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Internal network error: ' + error.message
        });
    }
};

module.exports = {
    listSubCategories,
    addSubCategories,
    deleteSubCategories,
    getSubCategory,
    editSubCategories,
    getCategories,
    countProducts,
    countActiveSubcategories,
    countInactiveSubcategories,
    parentOfSubcategory,
    mostProducts
}