const express = require('express')
const router = express.Router()
const OrderController = require('../controllers/OrderController')
const {authMiddleWare, authUserMiddleWare } = require('../middleware/AuthMiddleWare')


router.post('/create', authUserMiddleWare, OrderController.createOrder)
router.get('/get-all-order/:id',authUserMiddleWare, OrderController.getAllOrderDetails)
router.get('/get-details-order/:id',authUserMiddleWare, OrderController.getDetailsOrder)
router.delete('/cancel-order/:id',authUserMiddleWare, OrderController.cancelOrderDetails)
router.get('/get-all-order',authMiddleWare, OrderController.getAllOrder)


module.exports = router
