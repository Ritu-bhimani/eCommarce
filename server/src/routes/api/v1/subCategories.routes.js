const express = require('express')
const { subCategoriesController } = require('../../../controller')
const upload = require('../../../middleware/upload')


const routes = express.Router()

routes.get(
    '/list-subCategories',
    subCategoriesController.listSubCategories
)
routes.get(
    '/get-subCategories/:id',
    subCategoriesController.getSubCategory
)
routes.get(
    '/get-category/:category_id',
    subCategoriesController.getCategories
)
routes.post(
    '/add-subCategories',
    upload.single('sub_img'),
    subCategoriesController.addSubCategories
)
routes.delete(
    '/delete-subCategories/:id',
    subCategoriesController.deleteSubCategories
)
routes.put(
    '/edit-subCategories/:id',
    subCategoriesController.editSubCategories
)

routes.get(
    '/count-products',
    subCategoriesController.countProducts
)
routes.get(
    '/count-active',
    subCategoriesController.countActiveSubcategories
)
routes.get(
    '/inactive',
    subCategoriesController.countInactiveSubcategories
)
routes.get(
    '/parent-of-subcategory/:category_id',
    subCategoriesController.parentOfSubcategory
)
routes.get(
    '/most-products',
    subCategoriesController.mostProducts
)
module.exports = routes