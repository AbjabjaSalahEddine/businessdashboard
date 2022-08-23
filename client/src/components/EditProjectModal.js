import React, { useState } from "react";
import axios from "axios";
import Swal from 'sweetalert2'
const hostIp = window.location.href.split(":")[0]+":"+window.location.href.split(":")[1]+":5000"

const EditProjectModal = ({ open, onClose , project}) => {
  
  var [bu,setBu] = useState(project.bu)
  var [wonumber,setWonumber] = useState(project.wo_number)
  var [projectname,setProjectname] = useState(project.project_name)
  var [requestor,setRequestor] = useState(project.requestor)
  var [wodescription,setWodescription] = useState(project.wo_description)
  var [xr,setXr] = useState(project.xr)


  const handleSubmit= (e)=>{
    e.preventDefault()
    editProject()
  }
  
  const editProject= async ()=>{
    // bu=bu||project.bu;
    // wonumber=wonumber||project.wo_number
    // projectname=projectname||project.project_name
    // requestor=requestor||project.requestor
    // wodescription=wodescription||project.wo_description
    // xr=xr||project.xr
    await axios.put(hostIp+"/api/project/"+project.project_id, { id:Number(localStorage.getItem("id")),token:localStorage.getItem("token"), bu: bu, wo_number: wonumber,project_name:projectname,requestor:requestor,wo_description:wodescription,xr:xr})
      .then(response=>{
          console.log(response.data)
          
          Swal.fire({
            position: 'top-center',
            icon: 'info',
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
    <div className='m' >
            
            <div className='d-flex text-right align-items-center justify-content-between'>
                <div></div>
                <div><label style={{padding:'11px',fontSize:'20px'}}>Update a Project</label></div>
                <button className="btn btn-dark h1" onClick={onClose}><i className="fa fa-close"></i></button>
            </div>
            <div className='form' style={{paddingTop:'30px'}} >
                <form onSubmit={e => handleSubmit(e)}>
                    <input type="text" onChange={(e)=> setBu(e.target.value)} style={{height:"40px",margin:'3px 0px'}}  defaultValue={project.bu} placeholder='BU' />
                    <input type={"text"} onChange={(e)=> setWonumber(e.target.value)} style={{height:"40px",margin:'3px 0px'}} defaultValue={project.wo_number} placeholder='Wo_Nmber'/>
                    <input type="text" onChange={(e)=> setProjectname(e.target.value)} style={{height:"40px",margin:'3px 0px'}} defaultValue={project.project_name} placeholder='Project Name'/>
                    <input type="text" onChange={(e)=> setRequestor(e.target.value)} style={{height:"40px",margin:'3px 0px'}} defaultValue={project.requestor} placeholder='Requestor'/>
                    <textarea  onChange={(e)=> setWodescription(e.target.value)} style={{height:"80px",margin:'3px 0px',alignItems:'start'}} defaultValue={project.wo_description} placeholder='Wo_Description'></textarea>
                    <input type="text" onChange={(e)=> setXr(e.target.value)} style={{height:"40px",margin:'3px 0px'}} defaultValue={project.xr} placeholder='xR'/>
                    <button type="submit" className='btn btn-primary'style={{"margin":"20px",fontSize:'20px'}}><strong className='learfont' style={{fontSize:'18px'}}>update</strong></button>

                </form>
            </div>
            
        </div>

    </>
    
  );
};

export default EditProjectModal;
