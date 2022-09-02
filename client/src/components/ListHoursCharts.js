import Chart from "react-apexcharts";
import '../App.css'
import React, { useEffect, useState } from "react";

const axios = require('axios');
const hostIp = window.location.href.split(":")[0]+":"+window.location.href.split(":")[1]+":5000"




const ListHoursCharts = () => {
  const [data,setData]=useState()
  const [week, setWeek]=useState()
  const [weeks, setWeeks]=useState([])

  

  
  const getData= async ()=>{
  
    await axios.post(hostIp+"/api/dashboard/data", {chart:"employeeslistchartdata"})
    .then(response=>{
      setData(response.data)
      setWeeks(Object.keys(response.data))
      setWeek(Object.keys(response.data)[0])
        
    })
    .catch(error=>{
        console.log(JSON.parse(JSON.stringify(error.response)).data.msg);
        alert(JSON.parse(JSON.stringify(error.response)).data.msg)
    })
  }
  var series
  var options

  useEffect(() => {
    getData();
    
  },[]);
  
  
  if(data){
    console.log(Object.values(data[week]).map(e=>e["Missed"]))
    console.log(week)
    series= [{
      name: 'Projects',
      data: Object.values(data[week]).map(e=>e["Projects"])
    }, {
      name: 'Holidays',
      data: Object.values(data[week]).map(e=>e["Holidays"])
    }, {
      name: 'Missed',
      data: Object.values(data[week]).map(e=>e["Missed"])
    }, {
      name: 'Training',
      data: Object.values(data[week]).map(e=>e["Training"])
    }, {
      name: 'idle',
      data: Object.values(data[week]).map(e=>e["Idle"])
    }, {
      name: 'xR non Available',
      data: Object.values(data[week]).map(e=>e["xR non Available"])
    }]
    options = {
      chart: {
        type: 'bar',
        width: '100%',
        stacked: true,
        stackType: '100%',
        toolbar: {
          show: false
        }
      },
      dataLabels: {
        enabled: true,
        dropShadow: {
          enabled: false
        },
        style:{
         fontFamily: "Poppins",
         fontWeight:"normal"
        }
      },
      plotOptions: {
        bar: {
          horizontal: true,
        },
      },
      stroke: {
        show:false
      },
      
      colors: [
        '#0da36d',
        '#5b9bd5',
        '#a6a6a6',
        '#404040',
        '#ffc000',
        '#ff0000'
      ],
      yaxis:{
        labels: {
          show: true,
          style:{
            fontSize:  '15px',
          }
        }
      },
      xaxis: {
        categories: Object.keys(data[week]),
        labels: {
          show: false
        }
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val + "h"
          }
        }
      },
      fill: {
        opacity: 1
      
      },
      
      legend: {
        show: false
      }
      
    }
    
  }else{
    getData()
  }
  
  

    
   
    
   
    

  
  return (
   <>
   <div style={{ position:'relative' , width:'99%', height:'99%' }} >
   <p className="charttitle" style={{padding:'3px 3px'}}>
      Booked hours for each employee :
    </p>
    <div style={{display:'flex',justifyContent:'end',textAlign:'end',marigin:'3px 3px'}}>
      <p style={{margin:"0px 10px"}}>Calender Weeks : </p>
      <select onChange={(e)=> setWeek(e.target.value)} >
          {weeks.map((week) => {
            return <option value={week}>{week}</option>
          })}
      </select>
    </div>
    
    <div className="graphic-container" style={{width:'100%',margin:'auto',height:'100%'}}>
      {series ?<Chart options={options} series={series} type="bar" height={Object.keys(data[week]).length * 50} />:null}
    </div>
                
   </div>
    
   </>
   
    
    
     
    
  )
}

export default ListHoursCharts