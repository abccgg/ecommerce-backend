const bcrypt = require('bcryptjs')
const { genneralAccessToken, genneralRefreshToken } = require("./JwtService")
const Order = require('../models/OrderProduct')
const Product = require('../models/ProductModel')

const createOrder = (newOrder) => {
    return new Promise( async (resolve, reject) => {
        const {orderItems, paymentMethod, itemsPrice, shippingPrice, totalPrice, fullName, address, city, phone, user, isPaid, paidAt} = newOrder
        try {
            // const promises =  orderItems.map(async(order)=> {
            //     const productData = await Product.findOneAndUpdate(
            //         {
            //             _id: order.product,
            //             countInStock: {$gte: order.amount}
            //         }, 
            //         {
            //             $inc: {
            //                 countInStock: -order.amount,
            //                 selled: +order.amount 
            //             }
            //         },
            //         {new: true}
            //     )
            //     if(productData){
            //         return{
            //             status: 'ok',
            //             message: 'success'
            //         }
            //     }else{
            //         return{
            //             status: 'ok',
            //             message: 'ERR',
            //             id: order.product
            //         }
            //     }
            // })
            // const results = await Promise.all(promises)   
            // const newData = results && results.filter((item)=>item.id )
            // if(newData.length){
            //     const arrId = []
            //     newData.forEach((item)=>{
            //         arrId.push(item.id)
            //     })
            //     resolve({
            //         status: 'ERR',
            //         message: `San pham voi id: ${arrId.join(',')} khong du hang`
            //     })
            // }else{
                const createdOrder = await Order.create({
                    orderItems, 
                    shippingAddress: {
                        fullName,
                        address,
                        city,
                        phone
                    },
                    paymentMethod, 
                    itemsPrice, 
                    shippingPrice,
                    totalPrice,
                    user: user,
                    isPaid, paidAt
                })  
                if(createdOrder){
                    resolve({
                        status: 'ok',
                        message: 'success',
                        data: createdOrder
                    })
                }
            // }
        } catch (e) {
            reject(e)
        }
    })
}


const getAllOrderDetails = (id) => {
    return new Promise( async (resolve, reject) => {
        try {
            const order = await Order.find({
                user: id
            })
            if(order === null){
                resolve({
                    status: 'ok',
                    message: 'the order was not defined'
                })
            }
            resolve({
                status: 'ok',
                message: 'get details success',
                data: order

            })
        } catch (e) {
            reject(e)
        }
    })
}

const getOrderDetails = (id) => {
    return new Promise( async (resolve, reject) => {
        try {
            const order = await Order.findById({
                _id: id
            })
            if(order === null){
                resolve({
                    status: 'ok',
                    message: 'the order was not defined'
                })
            }
            resolve({
                status: 'ok',
                message: 'get details success',
                data: order

            })
        } catch (e) {
            reject(e)
        }
    })
}

const cancelOrderDetails = (id, data) => {
    return new Promise( async (resolve, reject) => {
        try {
            let order = []
            const promises =  data.map(async(order)=> {
                const productData = await Product.findOneAndUpdate(
                    {
                        _id: order.product,
                        //  selled: {$gte: order.amount}
                    }, 
                    {
                        $inc: {
                            countInStock: +order.amount,
                            selled: -order.amount 
                        }
                    },
                    {new: true}
                )
                console.log('productData', productData)
                if(productData){
                     order = await Order.findByIdAndDelete(id)
                    if(order === null){
                        resolve({
                            status: 'ok',
                            message: 'the order was not defined'
                        })
                    }
                }else{
                    return {
                        status: 'ok',
                        message: 'ERR',
                        id: order.product
                    }
                }
            })
            const results = await Promise.all(promises)   
            const newData = results && results.filter((item)=>item)
            if(newData.length){
                resolve({
                    status: 'ERR',
                    message: `San pham voi id${newData.join(',')} khong ton tai`
                })
            }
            resolve({
                status: 'ERR',
                message: 'success',
                data: order
            })
        } catch (e) {
            reject(e)
        }
    })
}


const getAllOrder = (id) => {
    return new Promise( async (resolve, reject) => {
        try {          
            const allOrder =  await Order.find()
            resolve({
                status: 'ok',
                message: 'success',
                data: allOrder
            })
        } catch (e) {
            reject(e)
        }
    })
}






module.exports = {
    createOrder,
    getAllOrderDetails,
    getOrderDetails,
    cancelOrderDetails,
    getAllOrder
}