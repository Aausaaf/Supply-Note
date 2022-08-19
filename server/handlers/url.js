const { Shorturl } = require("../database/url")
const shortId = require('shortid')
const posturl = async(req,res) => {
    try {
        const {longurl} = req.body
        console.log(longurl)
        if(!longurl)
        {
            return res.send('provide a valid url')
        }
        const urlexist = await Shorturl.findOne({url:longurl})
        console.log(urlexist)
        if(urlexist)
        {
            return res.send({short_url:`http://localhost:8080/${urlexist.shortId}`})
        }
        const shortUrl = await Shorturl({url:longurl,shortId:shortId.generate()})
        const result = await shortUrl.save()
        return res.send({short_url:`http://localhost:8080/${result.shortId}`}) 

    } catch (err) {
      return res.status(500).send(err)  
    }
}
const geturl = async(req,res)=>{
    let {shortid} = req.params
    console.log(shortid)
    const result = await Shorturl.findOne({shortId:shortid})
    if(!result)
    {
       return res.send("please write correct short link") 
    }
    return res.redirect(result.url)
    
}
module.exports = {
    posturl,
    geturl
}