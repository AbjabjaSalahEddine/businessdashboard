import React, { useState } from "react";
import Swal from 'sweetalert2'

const axios = require('axios');
const hostIp = window.location.href.split(":")[0]+":"+window.location.href.split(":")[1]+":5000"


const AddEmployeetModal = ({ open, onClose }) => {
  
  var [drts_full_name,setDrts_full_name] = useState()
  var [drts_id,setDrts_id] = useState()
  var [system_id,setSystem_id] = useState()
  var [system_login,setSystem_login] = useState()
  var [position,setPosition] = useState()
  var [reports_to,setReports_to] = useState()
  var [integration_d,setIntegration_d] = useState()
  var [exit_d,setExit_d] = useState()
  var [birth_d,setBirth_d] = useState()
  var [cin,setCin] = useState()
  var [phone,setPhone] = useState()


  const handleSubmit= (e)=>{
    e.preventDefault()
    addEmployee()
    
  }
  const addEmployee= async ()=>{
     
    await axios.post(hostIp+"/api/employee/", {
        id:Number(localStorage.getItem("id")),token:localStorage.getItem("token"), drts_full_name,drts_id,system_id,system_login,position,reports_to,integration_d,exit_d,birth_d,cin,phone
    })
    .then(response=>{
        console.log(response.data)
        
        Swal.fire({
          position: 'top-center',
          icon: 'success',
          title: JSON.parse(JSON.stringify(response)).data.msg,
          showConfirmButton: false,
          timer: 1600
        })
        setTimeout(() => {
          window.location.reload();
        }, 1600);
        
    })
    .catch(error=>{
        console.log(JSON.parse(JSON.stringify(error.response)).data.msg);
        alert(JSON.parse(JSON.stringify(error.response)).data.msg)
    })
}
  if (!open) return null;
  return (
    <>
    <div className='overlay' onClick={onClose}>
        
    </div>
    <div className='m' style={{height:"90vh"}}>
            <div className='d-flex text-right align-items-center justify-content-between'>
            <div></div><div><label style={{padding:'30px 0px',fontSize:'20px'}}>Add an Employee</label></div><button class="btn btn-dark h1" onClick={onClose}><i className="fa fa-close"></i></button>
            </div>
            <div style={{paddingTop:'30px 0px'}} >
                <form id='f' className="form d-flex flex-column align-items-center justify-content-between" onSubmit={e => handleSubmit(e)}>
                <input type="text" onChange={(e)=> setDrts_full_name(e.target.value)} style={{height:"40px",margin:'6px 0px',width:'70%'}}  placeholder='DRTS fullname'/>
                    <input type="text" onChange={(e)=> setDrts_id(e.target.value)} style={{height:"40px",width:'70%',margin:'3px 0px'}} placeholder='DRTS loginID' />
                    <input type="text" onChange={(e)=> setSystem_id(e.target.value)} style={{height:"40px",margin:'6px 0px',width:'70%'}} placeholder='System ID' />
                    <input type="text" onChange={(e)=> setSystem_login(e.target.value)} style={{height:"40px",margin:'6px 0px',width:'70%'}} placeholder='System login' />
                    <input type="text" onChange={(e)=> setPosition(e.target.value)} style={{height:"40px",margin:'6px 0px',width:'70%'}} placeholder='Position' />
                    <input type="text" onChange={(e)=> setReports_to(e.target.value)} style={{height:"40px",margin:'6px 0px',width:'70%'}} placeholder='reports to' />
                    <div className='d-flex text-right align-items-center justify-content-arraound' style={{width:"700px",margin:'6px 0px'}}>
                    <div style={{textAlign:"center"}}>
                    <label>Integration date : </label><input type="date" onChange={(e)=> {setIntegration_d(e.target.value);console.log(typeof e.target.value)} } />
                    </div>
                    <div style={{textAlign:"center"}}>
                    <label>Exit date : </label><input type="date" onChange={(e)=> {setExit_d(e.target.value);console.log(typeof e.target.value)} } />
                    </div>
                    <div style={{textAlign:"center"}}>
                    <label>Birth date : </label><input type="date" onChange={(e)=> {setBirth_d(e.target.value);console.log(typeof e.target.value)} } />
                    </div>
                    </div>
                    <input type="text" onChange={(e)=> setCin(e.target.value)} style={{height:"40px",margin:'10px 0px',width:'70%'}} placeholder='CIN' />
                    <input type="text" onChange={(e)=> setPhone(e.target.value)} style={{height:"40px",margin:'6px 0px',width:'70%'}} placeholder='PHONE N°' />
                    <button type="submit" className='btn btn-primary'style={{padding:'10px',margin:"10px 0px",fontSize:'20px',width:'40%'}}><strong className='learfont' style={{fontSize:'18px'}}>ADD</strong></button>

                </form>
            </div>
            
        </div>

    </>
    
  );
};

export default AddEmployeetModal;
