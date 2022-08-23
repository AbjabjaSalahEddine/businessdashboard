import { useState , useEffect} from 'react';
import '../App.css'
import Chart from "react-apexcharts";
const axios = require('axios');
const hostIp = window.location.href.split(":")[0]+":"+window.location.href.split(":")[1]+":5000"

const TreeChart = () => {
  const [treemapdata,setData]=useState()
  const getData= async ()=>{
     
    await axios.post(hostIp+"/api/dashboard/data", {chart:"treemapchartdata"})
    .then(response=>{
      setData(response.data)
        
    })
    .catch(error=>{
        console.log(JSON.parse(JSON.stringify(error.response)).data.msg);
        alert(JSON.parse(JSON.stringify(error.response)).data.msg)
    })
}

useEffect(() => {
  getData();
  
},[]);
if(treemapdata){
  var s = [{data:Object.keys(treemapdata).map((key) => Object({'x':key,'y':treemapdata[key]}))}]
  
}else{
  getData()
}
  
  

  var options ={
    chart: {
      offsetX: 8},
    title: {
      text: "Utilization by BU by week",
      align: 'center',
      margin: 30,
      offsetY:25,
      style: {
        fontSize:  '18px',
        fontWeight:  'normal',
        fontFamily:  "Poppins",
        color:  'black'
      },
    },
    colors: [
      '#4472c4',
      '#ed7d31',
      '#ffc000',
      '#5b9bd5',
      '#5b9bd5',
      '#70ad47'
    ],
    plotOptions: {
      treemap: {
        distributed: true,
        enableShades: false
      }
    },dataLabels: {
      enabled: true,
      style: {
        fontSize: '12px',
        fontFamily:  "Poppins"
      },
      formatter: function(text, op) {
        return [text, op.value]
      }
    }


    
  } ;
  

    return (
      <div>
        <div id="chart" style={{ position:'relative' , width:'99%', height:'99%' }} >
          
          {s ? <Chart options={options} series={s} type="treemap"  /> : null}
          
          
        </div>
      </div>
    )

  }

      

  export default TreeChart