import { useState , useEffect} from 'react';
import '../App.css'
import Chart from "react-apexcharts";


const TreeChart = () => {

  var  series= [{data: [{x: 'FCA',y: 742},
  {x: 'JLR',y: 670},
  { x: 'Rabat',y: 499},
  {x: 'Velizy',y: 188},
  { x: 'PSA',y: 140 },
  { x: 'O...',y: 5 }
  ]}] ;

  var options ={
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
        enableShades: true
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
          
          <Chart options={options} series={series} type="treemap"  />
          
          
        </div>
      </div>
    )

  }

      

  export default TreeChart