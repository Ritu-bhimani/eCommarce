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


const countSubcategories = async (req, res) => {
    try {
        const countSubCategories = await Categories.aggregate([
            {
                $lookup: {
                    from: "subcategories",
                    localField: "_id",
                    foreignField: "category_id",
                    as: "TotalSubcategory"
                }
            },
            {
                $unwind: {
                    path: "$TotalSubcategory",
                }
            },
            {
                $group: {
                    _id: "$TotalSubcategory.category_id",
                    "category":
                    {
                        $first: "$name"
                    },
                    "TotalSubcategory": {
                        $sum: 1
                    }
                }
            }
        ]);
        res.status(200).json({
            success: true,
            message: "Categories Data fetched.",
            data: countSubCategories

        });
    } catch (error) {
        res.status(500).send(error);
    }
}
const countActiveCategories = async (req, res) => {
    try {
        const countActiveCategory = await Categories.aggregate(
            [
                { $match: { is_Active: true } },
                { $group: { _id: null, count: { $sum: 1 } } }
            ]);
        console.log(countActiveCategory);

        res.status(200).json({
            success: true,
            message: "Categories Data fetched.",
            data: countActiveCategory

        });
    } catch (error) {
        res.status(500).json({
            succsess: false,
            error: 'internal network error' + error.message
        });
    }
}
const countInactiveCategories = async (req, res) => {
    try {
        const countInactiveCategory = await Categories.aggregate(
            [
                {
                    $match:
                        { is_Active: false }
                },
                { $count: "TotalInActiveCount" }
            ]);
        console.log(countInactiveCategory);

        res.status(200).json({
            success: true,
            message: "Categories Inactive Data fetched.",
            data: countInactiveCategory

        });
    } catch (error) {
        res.status(500).json({
            succsess: false,
            error: 'internal network error' + error.message
        });
    }
}
const mostPopularProducts = async (req, res) => {
    try {
        const mostPopularProducts = await Categories.aggregate(
            [
                {
                    $lookup: {
                        from: "products",
                        localField: "_id",
                        foreignField: "category",
                        as: "products"
                    }
                },
                {
                    $unwind: {
                        path: "$products"
                    }
                },
                {
                    $group: {
                        _id: "$_id",
                        name: { $first: "$name" },
                        "ProductName": {
                            $push: "$products.name"
                        },
                        count: {
                            $sum: 1
                        }
                    }
                },
                {
                    $sort: {
                        count: -1
                    }
                }, {
                    $limit: 3
                }
            ]);
        console.log(mostPopularProducts);

        res.status(200).json({
            success: true,
            message: "Categories most popular Data fetched.",
            data: mostPopularProducts

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
        const totalProducts = await Categories.aggregate(
            [
                {
                    $lookup: {
                        from: "products",
                        localField: "_id",
                        foreignField: "category",
                        as: "products"
                    }
                },
                {
                    $unwind: {
                        path: "$products"
                    }
                },
                {
                    $group: {
                        _id: "$_id",
                        name: { $first: "$name" },
                        "ProductName": {
                            $push: "$products.name"
                        },
                        count: {
                            $sum: 1
                        }
                    }
                }
            ]);
        console.log(totalProducts);

        res.status(200).json({
            success: true,
            message: "Categories most popular Data fetched.",
            data: totalProducts

        });
    } catch (error) {
        res.status(500).json({
            succsess: false,
            error: 'internal network error' + error.message
        });
    }
}
module.exports = {
    listCategories,
    addCategory,
    deleteCategory,
    getCategory,
    putCategory,
    countSubcategories,
    countActiveCategories,
    countInactiveCategories,
    mostPopularProducts,
    countProducts
}