import React, { useState,useEffect } from 'react';
import '../App.css'
import DonutChart from '../components/DonutChart'
import TreeChart from '../components/TreeChart'
import LineChart from '../components/LineChart'
import RadialChart from '../components/RadialChart'
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
        
        <div className="row w-100" style={{zIndex:1}}>
          <div className="col-lg-4 col-md-6 col-sm-12"> <DonutChart/> </div>
          <div className="col-lg-4 col-md-6 col-sm-12"> <LineChart/> </div>
          <div className="col-lg-4 col-md-6 col-sm-12"> <RadialChart/> </div>
          <div className="col-lg-4 col-md-6 col-sm-12"> <TreeChart/> </div>
          <div className="col-lg-4 col-md-6 col-sm-12"> <RadialChart/> </div>
          <div className="col-lg-4 col-md-6 col-sm-12"> <LineChart/> </div>
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