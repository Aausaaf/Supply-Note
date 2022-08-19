const mongoose = require('mongoose')


const UrlSchema = new mongoose.Schema({
    url:{
        type:String,
        required:true
    },
    shortId:{
        type:String,
        required:true
    }
})

const Shorturl = mongoose.model('Short',UrlSchema)
module.exports = {Shorturl}