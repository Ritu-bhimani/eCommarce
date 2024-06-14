const express=require('express')
const { subCategoriesController } = require('../../../controller')
const routes=express.Router()

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

module.exports=routes