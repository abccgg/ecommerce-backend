const Product = require("../models/ProductModel")

const createProduct = (newProduct) => {
    return new Promise( async (resolve, reject) => {
        const { name, image, type, price, countInStock, rating, description, discount} = newProduct
        try {
            const checkProduct = await Product.findOne({
                name: name
            })
            if(checkProduct !== null){
                resolve({
                    status: 'ok',
                    message: 'the product is already have'
                })
            }
            const newProduct = await Product.create({
                name, 
                image, 
                type, 
                price, 
                countInStock: Number(countInStock), 
                rating, 
                description,
                discount: Number(discount)
            })
            if(newProduct){
                resolve({
                    status: 'ok',
                    message: 'success',
                    data: newProduct
                })
            }
            
        } catch (e) {
            reject(e)
        }
    })
}

const updateProduct = (id, data) => {
    return new Promise( async (resolve, reject) => {
        try {
            const checkProduct = await Product.findOne({
                _id: id
            })
            if(checkProduct === null){
                resolve({
                    status: 'ok',
                    message: 'the product was not defined'
                })
            }
            const updatedProduct = await Product.findByIdAndUpdate(id, data, { new: true})
            resolve({
                status: 'ok',
                message: 'success',
                data: updatedProduct
            })
        } catch (e) {
            reject(e)
        }
    })
}

const deleteProduct = (id) => {
    return new Promise( async (resolve, reject) => {
        try {
            const checkProduct = await Product.findOne({
                _id: id
            })
            if(checkProduct === null){
                resolve({
                    status: 'ok',
                    message: 'the product was not defined'
                })
            }
            await Product.findByIdAndDelete(id)
            resolve({
                status: 'ok',
                message: 'delete product success',

            })
        } catch (e) {
            reject(e)
        }
    })
}

const deleteManyProduct = (ids) => {
    return new Promise( async (resolve, reject) => {
        try {
            await Product.deleteMany({_id: ids})
            resolve({
                status: 'ok',
                message: 'delete products success',
            })
        } catch (e) {
            reject(e)
        }
    })
}

const getAllProduct = (limit, page, sort, filter) => {
    return new Promise( async (resolve, reject) => {
        try {     
            const totalProduct = await Product.countDocuments() 
            let allProduct = []
            if(filter){
                const lable = filter[0]
                const allObjectFilter = await Product.find({ [lable]: {'$regex': filter[1]}}).limit(limit).skip(limit * page)            
                resolve({
                    status: 'ok',
                    message: 'success',
                    data: allObjectFilter,
                    total: totalProduct,
                    pageCurrent: page + 1,
                    totalPage: Math.ceil(totalProduct / limit)
                })
            }
            if(sort){
                const objectSort = {}
                objectSort[sort[1]] = sort[0]
                const allProductSort = await Product.find().limit(limit).skip(limit * page).sort(objectSort)
                resolve({
                    status: 'ok',
                    message: 'success',
                    data: allProductSort,
                    total: totalProduct,
                    pageCurrent: page + 1,
                    totalPage: Math.ceil(totalProduct / limit)
                })
            }   
            if(!limit){
                allProduct =  await Product.find()
            }else {
                allProduct =  await Product.find().limit(limit).skip(limit * page)
            }
            resolve({
                status: 'ok',
                message: 'success',
                data: allProduct,
                total: totalProduct,
                pageCurrent: page + 1,
                totalPage: Math.ceil(totalProduct / limit)
            })
        } catch (e) {
            reject(e)
        }
    })
}

const getDetailsProduct = (id) => {
    return new Promise( async (resolve, reject) => {
        try {
            const product = await Product.findOne({
                _id: id
            })
            if(product === null){
                resolve({
                    status: 'ok',
                    message: 'the product was not defined'
                })
            }
            resolve({
                status: 'ok',
                message: 'get details success',
                data: product

            })
        } catch (e) {
            reject(e)
        }
    })
}

const getAllType = () => {
    return new Promise( async (resolve, reject) => {
        try {      
            const allType =  await Product.distinct('type')
        
            resolve({
                status: 'ok',
                message: 'success',
                data: allType,
            })
        } catch (e) {
            reject(e)
        }
    })
}



module.exports = {
    createProduct,
    updateProduct,
    getDetailsProduct,
    deleteProduct,
    getAllProduct,
    deleteManyProduct,
    getAllType
}