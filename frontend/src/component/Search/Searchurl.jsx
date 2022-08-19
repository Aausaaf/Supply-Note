import axios from 'axios'
import React, { useState } from 'react'
import "./search.css"
import CopyToClipboard from 'react-copy-to-clipboard'
const Searchurl = () => {

    const [shorturl,setshorturl] = useState()
    const [copied,setCopied] = useState(false)
    const [url,seturl] = useState("")

    const getshorturl = (url) => {

        axios.post("http://localhost:8080/createurl",{

            longurl:url

        }).then((res)=>{

            console.log(res.data)

            if(res.data)
            {
                setshorturl(res.data.short_url)
                seturl("")
            }
        }).catch((err)=>{

            console.log(err)

        })
    }
  return (
    <>
    <div className="search_box">

       <input value={url} 

       onChange={(e)=>{

           seturl(e.target.value)

       }} type="text" placeholder='https://www.google.com/' />

    </div>

    <button 

    onClick={()=>{

       if(localStorage.getItem('token'))
       {

        getshorturl(url)

       }
       else
       {

        alert("please Login ")
        seturl("")

       }
    }}

     className='short_url_button'>Create Short Url</button>

    {
        (shorturl)?
        <>

       <div className="shorturl_text_box">

       <p className='short_url'>{shorturl}</p>

       </div>

     <CopyToClipboard text={shorturl}

     onCopy={()=>{

        setCopied(true)

     }}> 
        <button  className={copied?"copied":"copy"}>Copy link</button>
        
     </CopyToClipboard>

        </>:""
    }
    </>
  )
}

export default Searchurl