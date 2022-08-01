import React, { useState } from "react";
import { useNavigate } from 'react-router'
const axios = require('axios');


const AddProjectModal = ({ open, onClose }) => {
  
  const [bu,setBu] = useState('')
  const [wonumber,setWonumber] = useState('')
  const [projectname,setProjectname] = useState('')
  const [requestor,setRequestor] = useState('')
  const [wodescription,setWodescription] = useState('')
  const [xr,setXr] = useState('')
  const navigate = useNavigate()

  const handleSubmit= (e)=>{
    e.preventDefault()
    addProject()
    
  }
  const addProject= async ()=>{
     
    await axios.post("http://localhost:5000/api/project/", {
        id:Number(localStorage.getItem("id")),token:localStorage.getItem("token"), bu: bu, wo_number:wonumber,project_name:projectname,requestor:requestor,wo_description:wodescription,xr:xr
    })
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
    <div className='m' >
            <div className='d-flex text-right align-items-center justify-content-between'>
            <div></div><div><label style={{padding:'11px',fontSize:'20px'}}>Add a Project</label></div><button class="btn btn-dark h1" onClick={onClose}><i className="fa fa-close"></i></button>
            </div>
            <div className='form' style={{paddingTop:'30px'}} >
                <form onSubmit={e => handleSubmit(e)}>
                    <input type="text" onChange={(e)=> setBu(e.target.value)} style={{height:"40px",margin:'3px 0px'}}  placeholder='BU'/>
                    <input type="text" onChange={(e)=> setWonumber(e.target.value)} style={{height:"40px",margin:'3px 0px'}} placeholder='Wo_Nmber' />
                    <input type="text" onChange={(e)=> setProjectname(e.target.value)} style={{height:"40px",margin:'3px 0px'}} placeholder='Project Name' />
                    <input type="text" onChange={(e)=> setRequestor(e.target.value)} style={{height:"40px",margin:'3px 0px'}} placeholder='Requestor' />
                    <textarea  onChange={(e)=> setWodescription(e.target.value)} style={{resize:'none', height:"80px",margin:'3px 0px',alignItems:'start'}} placeholder='Wo_Description'></textarea>
                    <input type="text" onChange={(e)=> setXr(e.target.value)} style={{height:"40px",margin:'3px 0px'}} placeholder='xR' />
                    <button type="submit" className='btn btn-primary'style={{"margin":"20px",fontSize:'20px'}}><strong className='learfont' style={{fontSize:'18px'}}>ADD</strong></button>

                </form>
            </div>
            
        </div>

    </>
    
  );
};

export default AddProjectModal;