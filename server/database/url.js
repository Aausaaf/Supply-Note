const mongoose = require('mongoose')


const UrlSchema = new mongoose.Schema({
    url:{
        type:String,
        required:true
    },
    shortId:{
        type:String,
        required:true
    },
    expiry:{
        type:Object,

    }
})

const Shorturl = mongoose.model('Short',UrlSchema)

module.exports = {Shorturl}