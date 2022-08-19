const { Shorturl } = require("../database/url")
const shortId = require('shortid')
let date = new Date()

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
        const shortUrl = await Shorturl({url:longurl,shortId:shortId.generate(),expiry:{day:date.getDate(),time:date.getHours()}})
       
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

    if(result.expiry.day+2<date.getDate())
    {
        console.log(result.expiry.day+2,date.getDate())

        await Shorturl.deleteOne({shortId:shortid})

           return res.send("Expire Short url please create new one")
          
    }
    else if(result.expiry.day+2==date.getDate())
    {
         if(result.expiry.time>date.getHours())
         {
           
            return res.redirect(result.url)
            
         }
         else
         {
                   await Shorturl.deleteOne({shortId:shortid})
                   
            return res.send("Expire Short url please create new one")
          
         }
    }

    return res.redirect(result.url)
    
}
module.exports = {
    posturl,
    geturl
}