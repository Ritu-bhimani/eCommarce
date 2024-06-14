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
    categoriesController.putCategory    
)

module.exports=routes