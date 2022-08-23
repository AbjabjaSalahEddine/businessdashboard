import { useState , useEffect} from 'react';
import '../App.css'
import Chart from "react-apexcharts";

const axios = require('axios');
const hostIp = window.location.href.split(":")[0]+":"+window.location.href.split(":")[1]+":5000"

const LineChart = () => {
  const [data,setData]=useState()

  useEffect(() => {
    getData();
    
  },[]);
  
  const getData= async ()=>{
     
    await axios.post(hostIp+"/api/dashboard/data", {chart:"linechartdata"})
    .then(response=>{
      setData(response.data)
        
    })
    .catch(error=>{
        console.log(JSON.parse(JSON.stringify(error.response)).data.msg);
        alert(JSON.parse(JSON.stringify(error.response)).data.msg)
    })
}
if(data){
  var  series= [
      {
      name: "Dedicated HC",
      type: 'area',
      data: Object.values(data)
    },
    {
      name: "HeadCount",
      type: 'line',
      data: Object.values(data)
    },
    {
      name: 'Forcasted HC',
      type: 'line',
      data: Object.values(data)
    }
  ]
}
  

  var options ={
    chart: {
      offsetX: 0,
      offsetY: 20,
      type: 'line',
      zoom: {
        enabled: true
      },
    },
    dataLabels: {
      // enabled: [true,false,false],
      enabled: false,
      offsetY:-5,
      background: {
        enabled: false
      },
      style: {
        fontSize:  '10px',
        fontWeights:  ['bold','normal','normal'],
        fontFamily:  "Poppins",
        colors: ['black','#5e5e5e','#f91814']
      },
    },
    stroke: {
      width: [2, 2, 3],
      curve: ['smooth','smooth','smooth'],
    },
    colors: [
      '#c5e0b4',
      '#5e5e5e',
      '#f91814'
    ],
    title: {
      text: 'Dedicated VS Forcasted Resources',
      align: 'center',
      style: {
        fontSize:  '18px',
        fontWeight:  'normal',
        fontFamily:  "Poppins",
        color:  'black'
      },
    },
    legend: {
      tooltipHoverFormatter: function(val, opts) {
        return val + ' - ' + opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] + ''
      }
    },
    markers: {
      size:  0,
      hover: {
        sizeOffset: 6
      }
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
      ],
      
    },
    tooltip: {
      y: [
        {
          title: {
            formatter: function (val) {
              return val + " (mins)"
            }
          }
        },
        {
          title: {
            formatter: function (val) {
              return val + " per session"
            }
          }
        },
        {
          title: {
            formatter: function (val) {
              return val;
            },
          }
        }
      ]
    },
    grid: {
      borderColor: '#f1f1f1',
    }
  }

  

    return (
      <div>
        <div id="chart" style={{ position:'relative' , width:'99%', height:'99%' }} >
          
          { series ? <Chart options={options} series={series} type="line"  />:null}
          
          
        </div>
      </div>
    )

  }

      

  export default LineChart