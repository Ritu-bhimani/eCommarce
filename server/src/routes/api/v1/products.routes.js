const express = require('express')
const { productController } = require('../../../controller')

const router=express.Router()

router.get(
    '/list-products',
    productController.listProducts
)
router.get(
    '/get-product/:id',
    productController.getproduct
)

router.post(
    '/add-products',
    productController.addProducts
)
router.put(
    '/edit-products/:id',
    productController.editProducts
)
router.delete(
    '/delete-products/:id',
    productController.deleteProducts
)

module.exports=router