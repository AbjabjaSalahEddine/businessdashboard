import React, { useState,useEffect } from 'react';
import '../App.css'
import Navbar from '../components/Navbar'
import { useNavigate } from 'react-router'


const Projects = () => {
  const navigate = useNavigate()
  const [tobereturned,setTobereturned]=useState('')


  useEffect(() => {
    if(!localStorage.getItem("token")){
      navigate('/Sign-in')
    }else{
      setTobereturned(<>
        <Navbar/>
        <p>MANAGE PROJECTS</p>
        </>)
    }
  },[localStorage]);
  



  return (
    <>
    {tobereturned}
    </>
  )
}

export default Projects