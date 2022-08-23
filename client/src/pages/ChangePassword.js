import React, { useState} from 'react'
import { Navigate , useNavigate} from 'react-router-dom';
import '../App.css'
import Navbar from '../components/Navbar';
import Swal from 'sweetalert2'

const axios = require('axios');
const hostIp = window.location.href.split(":")[0]+":"+window.location.href.split(":")[1]+":5000"

const Changepassword = () => {
  
  const [newpassword,setNewpassword] = useState('')
  const [verifpassword,setVerifpassword] = useState('')
  const [password,setPassword] = useState('')
  const navigate = useNavigate()

  const updatepassword= async ()=>{
     if(newpassword===verifpassword){
        await axios.put(hostIp+"/api/auth/updatepassword",
      {newpassword: newpassword, password: password , token:localStorage.getItem("token") , id :Number(localStorage.getItem("id"))})
     .then(response=>{
      console.log(response.data)
         navigate('/Dashboard')
         Swal.fire({
          position: 'center',
          icon: 'success',
          title: "Password updated succesfully !!!",
          showConfirmButton: false,
          timer: 1600
        })
     })
     .catch(error=>{
        Swal.fire({
          title: JSON.parse(JSON.stringify(error.response)).data.msg,
          icon: 'error',
          timer: 1000,
          showConfirmButton: false
        })
     })
     }else{
        
        Swal.fire({
          title: 'Make sure you confirme your password !',
          icon: 'question',
          timer: 1000,
          showConfirmButton: false
        })
     }
     
 }


  const handleSubmit= (e)=>{
    e.preventDefault()
    if(!newpassword || !password){
      Swal.fire({
        title: 'Empty values',
        icon: 'question',
        timer: 1000,
        showConfirmButton: false
      })
    }else{
        updatepassword()
    }
    
  }
  if(localStorage.getItem('token')){
    return (
        <>
        <Navbar></Navbar>
        <div className='form' style={{paddingTop: '100px'}}>
        
        <p className='learfont' >change your password</p>
        <form action="" onSubmit={e => handleSubmit(e)}>
            
            <input type="password"  onChange={(e)=> setPassword(e.target.value)}  placeholder='Old Password' />
            <input type="password"  onChange={(e)=> setNewpassword(e.target.value)}  placeholder='New Password'/>
            <input type="password"  onChange={(e)=> setVerifpassword(e.target.value)}  placeholder='Confirm Password'/>
            <button type="submit" className='btn btn-primary'style={{fontSize:"18",padding:'10px',width:'200px',alignSelf:'center'}}><strong className='learfont'>change</strong></button>
    
        </form>
        </div>
        </>
        
        )
  }else{
    return (  <Navigate to='/sign-in'/> )
  }


  
}

export default Changepassword