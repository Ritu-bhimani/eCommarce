const express = require('express')
const { categoriesController } = require('../../../controller')
const upload = require('../../../middleware/upload')

const routes = express.Router()


routes.get(
    '/list-categories',
    categoriesController.listCategories
)

routes.get(
    '/get-category/:id',
    categoriesController.getCategory
)
routes.post(
    '/add-categories',
    upload.single('image'),
    categoriesController.addCategory
)
routes.delete(
    '/delete-categories/:id',
    categoriesController.deleteCategory
)
routes.put(
    '/edit-categories/:id',
    upload.single('image'),
    categoriesController.putCategory
)

routes.get(
    '/count-subcategories',
    categoriesController.countSubcategories
)
routes.get(
    '/count-active',
    categoriesController.countActiveCategories
)
routes.get(
    '/inactive',
    categoriesController.countInactiveCategories
)
routes.get(
    '/most-products',
    categoriesController.mostPopularProducts
)
routes.get(
    '/count-products',
    categoriesController.countProducts
)
module.exports = routes