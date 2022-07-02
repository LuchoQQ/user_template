const mongoose = require('mongoose')
const config = require('dotenv').config()

const connectDB = async() => {
    try {
        const db = mongoose.connect(process.env.DB_URI)
        console.log('Server connected to MongoDB')
    } catch (error) {
        console.log(error)
    }
}

module.exports = connectDB