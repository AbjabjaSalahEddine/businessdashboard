import React, { useState,useEffect } from 'react';
import '../App.css'
import Navbar from '../components/Navbar'
import { useNavigate } from 'react-router'
import ListEmployees from '../components/ListEmployees'


const Employees = () => {
  const navigate = useNavigate()
  const [tobereturned,setTobereturned]=useState('')


  useEffect(() => {
    if(!localStorage.getItem("token")){
      navigate('/Sign-in')
    }else{
      setTobereturned(<>
        <Navbar/>
        <br></br>
        <div style={{textAlign:"center" , width:"100%"}}>
            <p style={{fontSize:'30px'}}>MANAGE EMPLOYEES</p>
        </div>
        
        <ListEmployees />
        

        </>)
    }
  },[localStorage]);
  



  return (
    <>
    {tobereturned}
    </>
  )
}

export default Employees