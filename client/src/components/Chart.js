
import '../App.css'
import Chart from "react-apexcharts";


const DonutChart = (donutdata) => {
  var elements=[1,2,3,4,5,6,7]
  var options ={
    title: {
      text: "BookedHours Breakdown By Week",
      align: 'center',
      offsetX: -50,
      offsetY: 0,
      margin: 30,
      style: {
        fontSize:  '18px',
        fontWeight:  'normal',
        fontFamily:  "Poppins",
        color:  'black'
      },
    },
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
        <div className="donut" >
          <div id="chart post">
          
            <Chart options={options} series={donutdata.series} type="donut"  />
          
          </div>
          <div style={{display:"flex",margin:"30px",position:"absolute",top:"370px",left:"300px",fontSize:"17px"}}>
                <p style={{margin:"0px 10px"}}>Calender Weeks : </p>
                <select >
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