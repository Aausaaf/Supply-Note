import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "./signup.css"
const Signup = (props) => {
    const [name,setname] = useState("")
    const [email,setemail] = useState("")
    const [password,setpassword] = useState()
  
    const navigate = useNavigate()
  return (
    <div className="signup">
        <h1>Sign Up</h1>
        <br />
    
        
        <div className="input_div">
        <input type="text" style={{marginTop:"5vh"}} value={name} onChange={(e)=>{
            setname(e.target.value)  
        }} placeholder="Enter Your name" />
        <br />
        <input type="text" value={email} onChange={(e)=>{
            setemail(e.target.value)  
        }} placeholder="Enter Your email" />
        <br />
        <input type="text" value={password} onChange={(e)=>{
            setpassword(e.target.value)  
        }} placeholder="create your password" />
        </div>
        <br />
       
        <br />
        <button  className='signup_button'
        onClick={()=>{
            let a= {
                name:"aausaf",
                email:"aausafala@gmail.com",
                password:1234,
               

            }
           if(name!=null&&email.length>5&&password!=null)
           {
            axios.post("http://localhost:8080/createUser",{
                "name": name,
                "email": email,
                "password": password,
               
              }).then((res)=>{
                if(res.data)
                {
                    alert("Sign up Successfull Go to login page")
                    props.handlesignup(false)
                    props.handlesignupdisplay("none")
                    
            props.handlelogin(true)
                }
            }).catch((err)=>{
                console.log(err)
                alert(err.response.data.message)
            })
           }
           else if(email.length<5)
           {
            alert("please Enter vaild email")
           }
           else
           {
            alert("please provide required details")
           }
        }}
        >Sign up</button>
        <button className='cut_signup' onClick={()=>{
            props.handlesignup(false)
        }}>×</button>
          <p className='proute' onClick={()=>{
            props.handlesignup(false)
            props.handlelogin(true)
        }}>If You already have account ?</p>
    </div>
  )
}

export default Signup