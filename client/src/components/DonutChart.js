import { useState , useEffect} from 'react';
import '../App.css'
import Chart from "react-apexcharts";

const axios = require('axios');
const hostIp = window.location.href.split(":")[0]+":"+window.location.href.split(":")[1]+":5000"

const DonutChart = () => {

  const [data,setData]=useState({})
  const [week, setWeek]=useState()
  const [weeks, setWeeks]=useState([])

  useEffect(() => {
    getData();
    
  },[]);

  
  const getData= async ()=>{
     
    await axios.post(hostIp+"/api/dashboard/data", {chart:"donutchartdata"})
    .then(response=>{
      setData(response.data)
      setWeeks(Object.keys(response.data))
      setWeek(weeks[0])
        
    })
    .catch(error=>{
        console.log(JSON.parse(JSON.stringify(error.response)).data.msg);
        alert(JSON.parse(JSON.stringify(error.response)).data.msg)
    })
}

series=[0, 0, 0, 0, 0 , 0];
  
  var labels = ["Projects", "Holidays", "Missed", "Training", "Idle" , "xR non Available"];
  if(week){
    var  series=[data[week].Projects, data[week].Holidays, data[week].Missed, data[week].Training, data[week].Idle , data[week]["xR non Available"]];
  }else{
    getData()
  }
  
  var donutdata={labels,series};
  var options ={
    title: {
      text: "BookedHours Breakdown By Week",
      align: 'center',
      margin: 30,
      style: {
        fontSize:  '18px',
        fontWeight:  'normal',
        fontFamily:  "Poppins",
        color:  'black'
      },
    },
    colors: [
      '#0da36d',
      '#5b9bd5',
      '#a6a6a6',
      '#404040',
      '#ffc000',
      '#ff0000'
    ],
    plotOptions: {
      pie: {
        customScale: 1,
        donut: {
          labels: {
            show: true,
            total: {
              fontFamily:  "Poppins",
              showAlways: false,
              show: true
            }
          }
        }
      }
    },
    chart: {
      width: "300px",
      type: 'donut',
      dropShadow: {
        enabled: true,
        color: '#111',
        top: -2,
        left: 3,
        blur: 3,
        opacity: 0.3
      },
      toolbar: {
        show: true
      }
    },
    stroke: {
      width: 0.5,
    },
    labels: donutdata.labels,
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

    legend: {
      fontFamily:  "Poppins",
      position: 'right',
      offsetY: 70,
      height: 300,
    }
  } ;
  

    return (
      <div>
        <div style={{ position:'relative' , width:'99%', height:'99%' }} >
          
          <Chart options={options} series={series} type="donut"  />
          <div style={{display:"flex",position:"absolute ",bottom:"0%",right:"0%",fontSize:"14px"}}>
                <p style={{margin:"0px 10px"}}>Calender Weeks : </p>
                <select onChange={(e)=> setWeek(e.target.value)} >
                {weeks.map((week) => {
                  return <option value={week}>{week}</option>
                })}
                </select>
          </div>
          
        </div>
      </div>
    )

  }

      

  export default DonutChart