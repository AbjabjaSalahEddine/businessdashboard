import React, { useState,useEffect } from 'react';
import '../App.css'
import DonutChart from '../components/DonutChart'
import TreeChart from '../components/TreeChart'
import Navbar from '../components/Navbar'
import { useNavigate } from 'react-router'


const Dashboard = () => {
  const navigate = useNavigate()
  const [tobereturned,setTobereturned]=useState('')
  

  useEffect(() => {
    if(!localStorage.getItem("token")){
      navigate('/Sign-in')
    }else{
      setTobereturned(<>
        <Navbar/>
        <div className='chartsholder'>
          <div className='chartholder'>
            <DonutChart/>
          </div>
          <div className='chartholder' style={{backgroundColor:'red'}}>
            
          </div>
          <div className='chartholder' style={{backgroundColor:'cyan'}}>

          </div>
          <div className='chartholder'>
          <TreeChart/>
          </div>
          <div className='chartholder' style={{backgroundColor:'yellow'}}>
            
          </div>
          <div className='chartholder' style={{backgroundColor:'orange'}}>
            
          </div>
        </div>
        
        </>)
    }
  },[localStorage]);
  



  return (
    <>
    {tobereturned}
    </>
  )
}

export default Dashboard