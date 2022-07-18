import { useState , useEffect} from 'react';
import '../App.css'
import Chart from "react-apexcharts";


const LineChart = () => {

  var  series= [{
    name: "Dedicated HC",
    type: 'area',
    data: [45, 52, 38, 24, 33, 26, 21, 20, 6, 8, 15, 10]
  },
  {
    name: "HeadCount",
    type: 'line',
    data: [35, 41, 62, 42, 13, 18, 29, 37, 36, 51, 32, 35]
  },
  {
    name: 'Forcasted HC',
    type: 'line',
    data: [87, 57, 74, 99.5, 75, 38, 62, 47, 82, 56, 45, 47]
  }
]

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
      enabled: [true,false,false],
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
      width: [2, 3, 2],
      curve: ['straight','smooth','straight'],
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
          
          <Chart options={options} series={series} type="line"  />
          
          
        </div>
      </div>
    )

  }

      

  export default LineChart