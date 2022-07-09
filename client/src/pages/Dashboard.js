import React, { useState,useEffect } from 'react';
import '../App.css'
import DonutChart from '../components/Chart'
import Navbar from '../components/Navbar'
import { useNavigate } from 'react-router'


const Dashboard = () => {
  const navigate = useNavigate()
  const [tobereturned,setTobereturned]=useState('')
  var labels = ["Projects", "Holidays", "Missed", "Training", "Idle" , "xR non Available"];

  useEffect(() => {
    if(!localStorage.getItem("token")){
      navigate('/Sign-in')
    }else{
      setTobereturned(<>
        <Navbar/>
        <div style={{hight:"560px",width:"560px"}}>
          <DonutChart  {... donutdata}></DonutChart>
        </div>
        </>)
    }
  },[localStorage]);
  
  var  series=[44, 22, 13, 33 , 80 , 45];
  var donutdata={labels,series};



  return (
    <>
    {tobereturned}
    </>
  )
}

export default Dashboard