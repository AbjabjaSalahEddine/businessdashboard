import React, { useState } from "react";
import { useNavigate } from 'react-router'
import axios from "axios";


const EditEmployeeModal = ({ open, onClose , employee}) => {
  
  var [drts_full_name,setDrts_full_name] = useState(employee.drts_full_name)
  var [drts_id,setDrts_id] = useState(employee.drts_id)
  var [system_id,setSystem_id] = useState(employee.system_id)
  var [system_login,setSystem_login] = useState(employee.system_login)
  var [position,setPosition] = useState(employee.position)
  var [reports_to,setReports_to] = useState(employee.reports_to)
  var [integration_d,setIntegration_d] = useState(employee.integration_date)
  var [exit_d,setExit_d] = useState(employee.exit_date)
  var [birth_d,setBirth_d] = useState(employee.birth_date)
  var [cin,setCin] = useState(employee.cin)
  var [phone,setPhone] = useState(employee.phone_number)
  var navigate = useNavigate()

  const handleSubmit= (e)=>{
    e.preventDefault()
    editEmployee()
  }
  
  const editEmployee= async ()=>{
    
    await axios.put("http://localhost:5000/api/employee/"+employee.emp_id, { id:Number(localStorage.getItem("id")),token:localStorage.getItem("token"), drts_full_name,drts_id,system_id,system_login,position,reports_to,integration_d,exit_d,birth_d,cin,phone})
      .then(response=>{
          console.log(response.data)
          
          alert(JSON.parse(JSON.stringify(response)).data.msg)
          window.location.reload(false);
          
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
                <div></div>
                <div><label style={{padding:'11px',fontSize:'20px'}}>Update an Employee</label></div>
                <button className="btn btn-dark h1" onClick={onClose}><i className="fa fa-close"></i></button>
            </div>
            <div style={{paddingTop:'30px 0px'}} >
                <form id='f' className="form d-flex flex-column align-items-center justify-content-between" onSubmit={e => handleSubmit(e)}>
                <input type="text" onChange={(e)=> setDrts_full_name(e.target.value)} style={{height:"40px",margin:'6px 0px',width:'70%'}}  defaultValue={employee.drts_full_name} placeholder='DRTS fullname'/>
                    <input type="text" onChange={(e)=> setDrts_id(e.target.value)} style={{height:"40px",width:'70%',margin:'3px 0px'}} defaultValue={employee.drts_id} placeholder='DRTS loginID'/>
                    <input type="text" onChange={(e)=> setSystem_id(e.target.value)} style={{height:"40px",margin:'6px 0px',width:'70%'}} defaultValue={employee.system_id} placeholder='System ID'/>
                    <input type="text" onChange={(e)=> setSystem_login(e.target.value)} style={{height:"40px",margin:'6px 0px',width:'70%'}} defaultValue={employee.system_login} placeholder='System login'/>
                    <input type="text" onChange={(e)=> setPosition(e.target.value)} style={{height:"40px",margin:'6px 0px',width:'70%'}} defaultValue={employee.position} placeholder='Position'/>
                    <input type="text" onChange={(e)=> setReports_to(e.target.value)} style={{height:"40px",margin:'6px 0px',width:'70%'}} defaultValue={employee.reports_to} placeholder='reports to'/>
                    <div className='d-flex text-right align-items-center justify-content-arraound' style={{width:"700px",margin:'6px 0px'}}>
                    <div style={{textAlign:"center"}}>
                    <label>Integration date : </label><input type="date" onChange={(e)=> setIntegration_d(e.target.value) } defaultValue={employee.integration_date?employee.integration_date.toString().slice(0, 10):null}  />
                    </div>
                    <div style={{textAlign:"center"}}>
                    <label>Exit date : </label><input type="date" onChange={(e)=> setExit_d(e.target.value) } defaultValue={employee.exit_date?employee.exit_date.toString().slice(0, 10):null} />
                    </div>
                    <div style={{textAlign:"center"}}>
                    <label>Birth date : </label><input type="date" onChange={(e)=>setBirth_d(e.target.value) } defaultValue={employee.birth_date?employee.birth_date.toString().slice(0, 10):null}/>
                    </div>
                    </div>
                    <input type="text" onChange={(e)=> setCin(e.target.value)} style={{height:"40px",margin:'10px 0px',width:'70%'}} defaultValue={employee.cin} placeholder='CIN'/>
                    <input type="text" onChange={(e)=> setPhone(e.target.value)} style={{height:"40px",margin:'6px 0px',width:'70%'}} defaultValue={employee.phone_number} placeholder='PHONE N°'/>
                    <button type="submit" className='btn btn-primary'style={{padding:'10px',margin:"10px 0px",fontSize:'20px',width:'40%'}}><strong className='learfont' style={{fontSize:'18px'}}>Update</strong></button>

                </form>
            </div>
            
        </div>

    </>
    
  );
};

export default EditEmployeeModal;
