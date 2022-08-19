import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "./login.css"
import axios from 'axios'
const Login = (props) => {
  
    const [password,setpassword] = useState()
    const [email,setemail]= useState("")
   
  return (
    <div className="login">
        <h1>Login</h1>
       <br />

        <input style={{marginTop:"7vh"}} type="text" value={email} onChange={(e)=>{
            setemail(e.target.value)  
        }} placeholder="Enter your email" />
        <br />

      <input type="password" value={password} onChange={(e)=>{
            setpassword(e.target.value)  
        }} placeholder="Enter your password" />
        
        
        <br />
        <button style={{marginTop:"6vh"}}  className='login_button'

        onClick={()=>{

          console.log(email,password)

          if (email.length>10 && email.includes("@") &&password.length>=8){

           axios.post("http://localhost:8080/loginUser",{
                
            "password": password,
            "email": email
           
          }).then((res)=>{

            console.log(res.data)

            if(res.data.token)
            {

              localStorage.setItem('token', res.data.token);
              
            }
            if(res.data)
            {
                alert("Login Successfull")
                props.handleusername(res.data.name)
                props.handlelogin(false) 
               props.handlesignup(false)
               props.handlesignupdisplay("none")
               props.handlelogindisplay("none")
               props.handlelogoutdisplay("inline")

                
            }
          
              
            
        }).catch((err)=>{

            console.log(err)
            alert(err.response.data.message)
            setemail("")
            setpassword("")

        })}
        else if(email.length<10 || !(email.includes("@")))
        {

          alert("please Enter vaild email")

        }
         else if (password.length < 8)
         {

           alert("please Enter valid password")

         }
        else
        {

          alert("plese Field required details")

        }
        }}
        >Login</button>

         <button className='cut_login' onClick={()=>{

            props.handlelogin(false)

        }}>×</button>

        <p className='proute' onClick={()=>{

             props.handlelogin(false) 
              props.handlesignup(true)
           
        }}>If You haven't account ?</p>

    </div>
  )
}

export default Login