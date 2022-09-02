import { useState , useEffect} from 'react';
import '../App.css'
import Chart from "react-apexcharts";

const axios = require('axios');
const hostIp = window.location.href.split(":")[0]+":"+window.location.href.split(":")[1]+":5000"


const RadialChart = () => {

  const [data,setData]=useState()
  useEffect(() => {
    getData();
    
  },[]);

  const getData= async ()=>{
     
    await axios.post(hostIp+"/api/dashboard/data", {chart:"radialchartdata"})
    .then(response=>{
      setData(response.data)
        
    })
    .catch(error=>{
        console.log(JSON.parse(JSON.stringify(error.response)).data.msg);
        alert(JSON.parse(JSON.stringify(error.response)).data.msg)
    })
}
  const levels=[{value :'Poor',color :'#ff0000'},{value :'AVERAGE',color :'#ffc000'},{value :'GOOD',color :'#0da36d'}]
  var level=2
  if(data){
    var  series= [data.efficiency]
    if(series[0]<90){
      level=1
    }
    if(series[0]<80){
      level=0
    }
  }else{
    getData()
  }
  
  
  
  var options= {
    chart: {
      height: 350,
      type: 'radialBar',
      offsetY: 0,
      toolbar: {
        show: true
      },
    },
     title: {
      text: 'Rabat YTD Efficiency',
      align: 'center',
      offsetY: 30,
      style: {
        fontSize:  '18px',
        fontWeight:  'normal',
        fontFamily:  "Poppins",
        color:  'black'
      }
     },
     
    plotOptions: {
      radialBar: {
        startAngle: -120,
        endAngle: 120,
        color:levels[level].color,
        dataLabels: {
          name: {
            fontSize: '20px',
            color: levels[level].color,
            fontFamily:  "Poppins",
            offsetY: -20
          },
          value: {
            offsetY: 0,
            fontSize: '22px',
            fontFamily:  "Poppins",
            color: levels[level].color,
            formatter: function (val) {
              return val + "%";
            }
          }
        }
      }
    },
    fill: {
      type: 'gradiant',
      colors: [levels[level].color]
    },
    stroke: {
      dashArray: 4
    },
    labels: [levels[level].value],
  }



    return (
      <div>
        <div style={{ position:'relative' , width:'99%', height:'99%' }} >
          
        {series ?<Chart options={options} series={series} type="radialBar"  />:null}
          
          
        </div>
      </div>
    )

  }

      

  export default RadialChart