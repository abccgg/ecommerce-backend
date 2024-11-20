const ProductService = require('../services/ProductService')

const createProduct = async(req, res) => {
    try {
        const { name, image, type, price, countInStock, rating, description, discount} = req.body
        if (!name || !image || !type || !price || !countInStock || !rating || !discount){
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is required'
            })
     
        }
        const response = await ProductService.createProduct(req.body)
        return res.status(200).json(response)
    } catch (err) {
        return res.status(404).json({
            message: err
        })
    }
}

const updateProduct = async(req, res) => {
    try {
        const productId = req.params.id
        const data = req.body
        if(!productId){
            return res.status(200).json({
                status: 'ERR',
                message: 'The productId is required'
            })
        }
        const response = await ProductService.updateProduct(productId, data)
        return res.status(200).json(response)
    } catch (err) {
        return res.status(404).json({
            message: err
        })
    }
}

const getDetailsProduct = async(req, res) => {
    try {
        const productId = req.params.id
        if(!productId){
            return res.status(200).json({
                status: 'ERR',
                message: 'The productId is required'
            })
        }
        const response = await ProductService.getDetailsProduct(productId)
        return res.status(200).json(response)
    } catch (err) {
        return res.status(404).json({
            message: err
        })
    }
}

const deleteProduct = async(req, res) => {
    try {
        const productId = req.params.id
        if(!productId){
            return res.status(200).json({
                status: 'ERR',
                message: 'The productId is required'
            })
        }
        const response = await ProductService.deleteProduct(productId)
        return res.status(200).json(response)
    } catch (err) {
        return res.status(404).json({
            message: err
        })
    }
}

const deleteMany = async(req, res) => {
    try {
        const ids = req.body.ids
        if(!ids){
            return res.status(200).json({
                status: 'ERR',
                message: 'The ids is required'
            })
        }
        const response = await ProductService.deleteManyProduct(ids)
        return res.status(200).json(response)
    } catch (err) {
        return res.status(404).json({
            message: err
        })
    }
}


const getAllProduct = async(req, res) => {
    try {
        const { limit , page, sort, filter} = req.query
        const response = await ProductService.getAllProduct(Number(limit) || null, Number(page) || 0, sort, filter)
        return res.status(200).json(response)
    } catch (err) {
        return res.status(404).json({
            message: err
        })
    }
}

const getAllType = async(req, res) => {
    try {
        const response = await ProductService.getAllType()
        return res.status(200).json(response)
    } catch (err) {
        return res.status(404).json({
            message: err
        })
    }
}


module.exports = {
    createProduct,
    updateProduct,
    getDetailsProduct,
    deleteProduct,
    getAllProduct,
    deleteMany,
    getAllType
}