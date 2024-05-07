import { Product } from '../models/Product.js'
import cloudinary from 'cloudinary'
import { tryCatch } from "../middlewares/error.js"
import { ErrorHandler } from "../utils/utility.js"

const createProduct = tryCatch(async (req, res) => { //admin
    let images = []
    if (typeof req.body.images === 'string') images.push(req.body.images)
    else images = req.body.images
    let imagesLink = []
    for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.v2.uploader.upload(images[i], {
            folder: 'Products',
            width: 480,
            height: 360,
            crop: 'scale'
        })
        imagesLink.push({
            public_id: result.public_id,
            url: result.secure_url
        })
    }
    req.body.images = imagesLink
    req.body.user = req.user._id
    const product = await Product.create(req.body)
    res.status(201).json({ product, success: true })
})

const getAllProducts = tryCatch(async (req, res) => {
    const products = await Product.find({ user: req.user._id })
    res.status(200).json({ products, success: true })
})

const getProducts = tryCatch(async (req, res) => {
    const { page, keyword, price, category, rating } = req.query
    const resultPerPage = 5
    const skip = resultPerPage * (page - 1)
    const productCount = await Product.countDocuments()
    let products = await Product.find({
        name: {
            $regex: keyword,
            $options: 'i'
        },
        price: {
            $gte: price.gte,
            $lte: price.lte
        }, rating: {
            $gte: rating
        }
    })
        .skip(skip)
        .limit(resultPerPage)

    if (category)
        products = await Product.find({
            name: {
                $regex: keyword,
                $options: 'i'
            },
            price: {
                $gte: price.gte,
                $lte: price.lte
            },
            category,
            rating: {
                $gte: rating
            }
        })
            .skip(skip)
            .limit(resultPerPage)

    res.status(200).json({ products, productCount, filteredProductsCount: products.length, resultPerPage, success: true })
})

const productDetails = tryCatch(async (req, res) => {
    let product = await Product.findById(req.params.id)
    if (!product) return next(new ErrorHandler(404, 'Product not found'))
    res.status(200).json({ product, success: true })
})

const updateProduct = tryCatch(async (req, res) => { //admin
    let product = await Product.findById(req.params.id)
    if (!product) return next(new ErrorHandler(404, 'Product not found'))
    let images = []
    if (typeof req.body.images === 'string') images.push(req.body.images)
    else images = req.body.images
    if (images !== undefined) {
        for (let i = 0; i < product.images.length; i++) await cloudinary.v2.uploader.destroy(product.images[i].public_id)
    }
    let imagesLink = []
    for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.v2.uploader.upload(images[i], { folder: 'Products' })
        imagesLink.push({
            public_id: result.public_id,
            url: result.secure_url
        })
    }
    req.body.images = imagesLink
    product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    res.status(200).json({ product, success: true })
})

const delProduct = tryCatch(async (req, res) => { //admin
    const product = await Product.findById(req.params.id)
    if (!product) return next(new ErrorHandler(404, 'Product not found'))
    for (let i = 0; i < product.images.length; i++) await cloudinary.v2.uploader.destroy(product.images[i].public_id)
    await Product.deleteOne({ _id: product._id })
    res.status(200).json({ msg: 'Product deleted successfully', success: true })
})

const review = tryCatch(async (req, res) => {
    const { _id, name } = req.user
    const { rating, comment, productID } = req.body
    const review = {
        user: _id,
        name,
        rating: Number(rating),
        comment
    }
    const product = await Product.findById(productID)
    if (!product) return next(new ErrorHandler(404, 'Product not found'))
    const isReviewed = product.reviews.find(review => review.user.toString() === _id.toString())
    if (isReviewed) product.reviews.forEach(review => {
        if (review => review.user.toString() === _id.toString()) {
            review.rating = rating
            review.comment = comment
        }
    })
    else {
        product.reviews.push(review)
        product.numOfReviews += 1
    }
    let total = 0
    product.reviews.forEach(review => total += review.rating)
    product.rating = total / product.reviews.length
    await product.save()
    res.status(200).json({ product, success: true })
})

const reviewsOfProduct = tryCatch(async (req, res) => {
    const product = await Product.findById(req.parmas.id)
    if (!product) return next(new ErrorHandler(404, 'Product not found'))
    res.status(200).json({ reviews: product.reviews, success: true })
})

const delReview = tryCatch(async (req, res) => {
    const { productID } = req.query
    const product = await Product.findById(productID)
    if (!product) return next(new ErrorHandler(404, 'Product not found'))
    const reviews = product.reviews.filter(review => review._id.toString() !== req.params.id.toString())
    let total = 0
    reviews.forEach(review => total += review.rating)
    let rating
    if (reviews.length > 0) rating = total / reviews.length
    else rating = 0
    const numOfReviews = reviews.length
    await Product.findByIdAndUpdate(productID, { reviews, rating, numOfReviews }, {
        new: true,
        runValidators: true
    })
    res.status(200).json({ msg: 'Review deleted', success: true })
})

export { createProduct, delProduct, delReview, getAllProducts, getProducts, productDetails, review, reviewsOfProduct, updateProduct }