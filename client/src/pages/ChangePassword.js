import React, { useState} from 'react'
import { Navigate , useNavigate} from 'react-router-dom';
import '../App.css'
import Navbar from '../components/Navbar';
import environement from '../env.js'
const axios = require('axios');


const Changepassword = () => {
  
  const [newpassword,setNewpassword] = useState('')
  const [verifpassword,setVerifpassword] = useState('')
  const [password,setPassword] = useState('')
  const navigate = useNavigate()

  const updatepassword= async ()=>{
     if(newpassword===verifpassword){
        await axios.put(environement.hostip+"/api/auth/updatepassword",
      {newpassword: newpassword, password: password , token:localStorage.getItem("token") , id :Number(localStorage.getItem("id"))})
     .then(response=>{
      console.log(response.data)
         navigate('/Dashboard')
         alert("Password updated succesfully !!!")
     })
     .catch(error=>{
        console.log(JSON.parse(JSON.stringify(error.response)).data.msg);
        alert(JSON.parse(JSON.stringify(error.response)).data.msg)
     })
     }else{
        alert("Make sure you confirme your password !")
     }
     
 }


  const handleSubmit= (e)=>{
    e.preventDefault()
    if(!newpassword || !password){
      alert('Empty values')
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