import React, { useState,useEffect } from 'react';
import '../App.css'
import Navbar from '../components/Navbar'
import { useNavigate } from 'react-router'
import ListProjects from '../components/ListProjects'

const Projects = () => {
  const navigate = useNavigate()
  const [tobereturned,setTobereturned]=useState('')


  useEffect(() => {
    if(!localStorage.getItem("token")){
      navigate('/Sign-in')
    }else{
      setTobereturned(<>
        <Navbar/>
        <br></br>
        
        
        <ListProjects />
        

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