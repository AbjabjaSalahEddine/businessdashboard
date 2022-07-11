import { useState , useEffect} from 'react';
import '../App.css'
import Chart from "react-apexcharts";


const DonutChart = () => {
  const [week, setWeek]=useState('24')
  var labels = ["Projects", "Holidays", "Missed", "Training", "Idle" , "xR non Available"];
  var  series=[60,30+ parseInt(week) , 13, 33 , 50 , 9];
  var donutdata={labels,series};
  var elements=[1,2,3,4,5,6,7,99]
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
  useEffect(() => {
    
  },[week]);

    return (
      <div>
        <div style={{ position:'relative' , width:'99%', height:'99%' }} >
          
          <Chart options={options} series={series} type="donut"  />
          <div style={{display:"flex",position:"absolute ",top:"83%",left:"60%",fontSize:"15px"}}>
                <p style={{margin:"0px 10px"}}>Calender Weeks : </p>
                <select onChange={(e)=> setWeek(e.target.value)} >
                <option value="24">24</option>
                {elements.map((week) => {
                  return <option value={week}>{week}</option>
                })}
                </select>
          </div>
          
        </div>
      </div>
    )

  }

      

  export default DonutChart