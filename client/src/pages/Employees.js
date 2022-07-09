import React, { useState,useEffect } from 'react';
import '../App.css'
import Navbar from '../components/Navbar'
import { useNavigate } from 'react-router'


const Employees = () => {
  const navigate = useNavigate()
  const [tobereturned,setTobereturned]=useState('')


  useEffect(() => {
    if(!localStorage.getItem("token")){
      navigate('/Sign-in')
    }else{
      setTobereturned(<>
        <Navbar/>
        <p>MANAGE EMPLOYEES</p>
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