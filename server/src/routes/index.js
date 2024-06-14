const express = require('express')


const router=express.Router()

const categoriesRoute=require('./api/v1/categories.routes')
const subCategoriesRoute=require('./api/v1/subCategories.routes')
const productRoute=require('./api/v1/products.routes')

router.use('/categories',categoriesRoute);
router.use('/subCategories',subCategoriesRoute);
router.use('/products',productRoute);

module.exports=router