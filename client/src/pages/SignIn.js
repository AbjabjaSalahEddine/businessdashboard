import React, { useState} from 'react'
import { useNavigate } from 'react-router'
import '../App.css'
const axios = require('axios');


const SignIn = () => {
  
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const navigate = useNavigate()

  const signIn= async ()=>{
     
     await axios.post("http://localhost:5000/api/auth/login", {email: email, password: password})
     .then(response=>{
      console.log(response.data)
          alert("Welcome! you'r logged in")
          console.log(JSON.parse(JSON.stringify(response.data)).token)
         localStorage.setItem("token",JSON.parse(JSON.stringify(response.data)).token) ;
         navigate('/Dashboard')
         
     })
     .catch(error=>{
         console.log(JSON.parse(JSON.stringify(error.response)).data.msg);
         alert(JSON.parse(JSON.stringify(error.response)).data.msg)
     })
 }


  const handleSubmit= (e)=>{
    e.preventDefault()
    if(!email || !password){
      alert('Empty values')
    }else{
      console.log(email)
      signIn()
    }
    
  }

  return (
    <div className='form' >
    {/*<div className="alert-box">
        Alert!
  </div>*/}
    <p className='learfont'>ACCESS TO BUSINESS DASHBOARD</p>
    <form action="" onSubmit={e => handleSubmit(e)}>
        <input type="email"  onChange={(e)=> setEmail(e.target.value)} className='form-control' placeholder='Email'/>
        <input type="password"  onChange={(e)=> setPassword(e.target.value)}  placeholder='Password' />
        <button type="submit" className='btn btn-primary'style={{"margin":"0"}}><strong className='learfont'>Sign In</strong></button>

    </form>
    </div>
  )
}

export default SignIn