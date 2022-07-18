import { useState , useEffect} from 'react';
import '../App.css'
import Chart from "react-apexcharts";


const RadialChart = () => {
  const levels=[{value :'Poor',color :'#ff0000'},{value :'AVERAGE',color :'#ffc000'},{value :'GOOD',color :'#0da36d'}]
  var [level,setLevel]=useState(2)
  var  series= [94.9]
  if(series[0]<90){
    level=1
  }
  if(series[0]<80){
    level=0
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
          
          <Chart options={options} series={series} type="radialBar"  />
          
          
        </div>
      </div>
    )

  }

      

  export default RadialChart