import React, { useState} from 'react'
import { useNavigate } from 'react-router'
import '../App.css'
import Swal from 'sweetalert2'


const axios = require('axios');
const hostIp = window.location.href.split(":")[0]+":"+window.location.href.split(":")[1]+":5000"

const SignIn = () => {
  
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const navigate = useNavigate()
  
  const signIn= async ()=>{
     
     await axios.post(hostIp+"/api/auth/login", {email: email, password: password})
     .then(response=>{
      console.log(response.data)
          // alert("Welcome! you'r logged in")
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: "Welcome! you'r logged in",
            showConfirmButton: false,
            timer: 1600
          })
          console.log(response.data.token)
         localStorage.setItem("token",response.data.token) ;
         localStorage.setItem("id",response.data.id)
         navigate('/Dashboard')
         
     })
     .catch(error=>{
        //  console.log(JSON.parse(JSON.stringify(error.response)).data.msg);
        //  alert(JSON.parse(JSON.stringify(error.response)).data.msg)
         Swal.fire({
          title: JSON.parse(JSON.stringify(error.response)).data.msg,
          icon: 'error',
          timer: 1000,
          showConfirmButton: false
        })
        
     })
 }


  const handleSubmit= (e)=>{
    e.preventDefault()
    if(!email || !password){
      Swal.fire({
        title: 'Empty values',
        icon: 'question',
        timer: 1000,
        showConfirmButton: false
      })
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
        <input type="email"  onChange={(e)=> setEmail(e.target.value)}  placeholder='Email'/>
        <input type="password"  onChange={(e)=> setPassword(e.target.value)}  placeholder='Password' />
        <button type="submit" className='btn btn-primary'style={{"margin":"0"}}><strong className='learfont'>Sign In</strong></button>

    </form>
    </div>
  )
}

export default SignIn