const app = require('./app')
const cloud = require('cloudinary')
const { connectDatabase } = require('./config/database')

cloud.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API,
    api_secret: process.env.CLOUDINARY_SECRET,
})

connectDatabase()

app.listen(process.env.PORT, () => console.log(process.env.PORT))