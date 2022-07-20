import React, { useState,useEffect } from 'react';
import '../App.css'
import Navbar from '../components/Navbar'
import { useNavigate } from 'react-router'


const Projects = () => {
  const navigate = useNavigate()
  const [tobereturned,setTobereturned]=useState('')
  const [formdisplay,setFormdisplay]=useState(false)


  useEffect(() => {
    console.log(formdisplay)
    if(!localStorage.getItem("token")){
      navigate('/Sign-in')
    }else{
      setTobereturned(<>
        <Navbar/>
        <p>MANAGE PROJECTS</p>
        

        </>)
    }
  },[localStorage,formdisplay]);
  



  return (
    <>
    {tobereturned}
    </>
  )
}

export default Projects