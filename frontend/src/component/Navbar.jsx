
import "../page/Home.css"
import Signup from './signup'
import { useState } from "react"
import Login from "./Login"
import axios from "axios"
import React from 'react'
const Navbar = () => {
    const [signupDisplay,setsignupdisplay] = useState(false)
    const [loginDisplay,setlogindisplay] = useState(false)
    const [signuphide,setsignuphide] = useState("inline")
    const [loginhide,setloginhide] = useState("inline")
    const [logouthide,setlogouthide] = useState("none")

     const [username,setusername] = useState("")
       const handlesignup = (t) => {
        setsignupdisplay(t)
       }
       const handlelogin = (t) => {
        setlogindisplay(t)
       }
       const handlesignupdisplay = (t) => {
        setsignuphide(t)
       }
       const handlelogindisplay = (t) => {
        setloginhide(t)
       }
       const handleusername = (t) => {
        setusername(t)
       }
       const handlelogoutdisplay = (t) => {
        setlogouthide(t)
       }

       const getuser = () => {
        axios.get(`http://localhost:8080/isLoggedIn`,{
            headers:{
                token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmZmMGVkMmZhYTkxODBlNjU4NTEyMDciLCJpYXQiOjE2NjA4ODUyMDMsImV4cCI6MTY2MDk3MTYwM30.QcwBzqY8Wv5IfyCywlIAcBId-N0jXcgev9GFZXtf1CM"
            }
        }).then((res)=>{
            console.log(res.data)
            if(res.data)
            {
                
                setsignuphide("none")
                setloginhide("none")
                handleusername(res.data.name)
                setlogouthide("inline")
            }
        }).catch((err)=>{
            console.log(err)
        })
       }

       React.useEffect(() => {
        if(!localStorage.getItem('token')){
          
        }
        else{
          getuser(localStorage.getItem('token'));
        }
      },[]);


  return (
    <>
     <div className="navbar">
        <div className="logo">URL Shortner</div>
        <button style={{display:signuphide}} className='signup_nav'
        onClick={()=>{
            setlogindisplay(false)
            setsignupdisplay(true)
           

        }}>Sign up</button>
        <button style={{display:loginhide}} className='login_nav' 
          onClick={()=>{
            setsignupdisplay(false)
            setlogindisplay(true)
           
        }}>Login</button>
        <p className="username">{username}</p>
        <button style={{display:logouthide}} className='logout_nav' 
          onClick={()=>{
            localStorage.removeItem('token')
            window.location.reload()
            setlogouthide("none")
           
        }}>Logout</button>
     </div>
     {
     (signupDisplay)?<Signup handlesignupdisplay={handlesignupdisplay} handlesignup={handlesignup} handlelogin={handlelogin}></Signup>:""
    

  }
  {
     (loginDisplay)?<Login  handlesignupdisplay={handlesignupdisplay} handlelogindisplay={handlelogindisplay}  handlesignup={handlesignup} handlelogin={handlelogin} handleusername={handleusername} handlelogoutdisplay={handlelogoutdisplay}></Login>:""
  }  
    </>
  )
}

export default Navbar