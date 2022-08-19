import axios from "axios";
import '../App.css'
import React, { useEffect, useState } from "react";
import AddProjectModal from "./AddProjectModal";
import EditProjectModal from './EditProjectModal'
import environement from '../env.js'

const ListProjects = () => {
    const [projects, setProjects] = useState([]);
    const [openModal1,setOpenModal1]=useState(false)
    const [openModal2,setOpenModal2]=useState(false)
    const [projecttobeedited,setProject]=useState();
    const [search,setSearch]=useState('')
    const [data,setData]=useState()

  
    const openEditing = (project)=>{
      setProject(project);
    }
  
    const getProjects = async () => {
      try {
        const response = await fetch(environement.hostip+"/api/project");
        const jsonData = await response.json();
        setData(jsonData)
        setProjects(jsonData);
      } catch (err) {
        console.error(err.message);
      }
    };

    
    const deleteProject = async (project_id) => {
      let id=Number(localStorage.getItem("id"))
      let token=localStorage.getItem("token")
      axios.delete(environement.hostip+"/api/project/"+Number(project_id),{ data: { id:id,token:token}})
    .then(response=>{
        console.log(id)
        
        alert(JSON.parse(JSON.stringify(response)).data.msg)
        getProjects()
        
    })
    .catch(error=>{
      console.log(token)
        console.log(JSON.parse(JSON.stringify(error.response)).data.msg);
        alert(JSON.parse(JSON.stringify(error.response)).data.msg)
    })
    };
    const handleSubmit= (e)=>{
      e.preventDefault()
      filtersearch()
    }
    
    const filtersearch =()=>{

      const p = data.filter(project => !search || project.wo_number.toUpperCase().includes(search.toUpperCase()));
      setProjects(p)
      
    }
    useEffect(() => {
      getProjects();
      
    },[]);

  
  return (
   
   <div style={{width:'90%',margin:'auto'}}>
    <div style={{textAlign:"center" , width:"100%"}}>
            <p style={{fontSize:'30px'}}>MANAGE PROJECTS</p>
        </div>
    <nav className="justify-content-between" style={{position:"unset",width:'90%',margin:'auto'}}>
      <button type="button" className="btn btn-outline-success modalButton" style={{borderRight:'solid 1px black',padding:'10px 20px'}}  onClick={()=>setOpenModal1(true)}>Add a Project <i className="fa fa-plus"></i></button>
        <AddProjectModal open={openModal1} onClose={() => setOpenModal1(false)} />
        <form onSubmit={e => handleSubmit(e)} style={{whidth:'400px'}} className="d-flex">
            <input type="search" onChange={(e)=> setSearch(e.target.value)}  placeholder='Search By WO Number'/>
            <button className="btn btn-outline-warning my-2 my-sm-0" type="submit">Search <i className="fa fa-search"></i></button>
        </form>
    </nav>
   <table className="table mt-5 text-center">
        <thead>
          <tr>
            <th>BU</th>
            <th>Wo_Nmber</th>
            <th>Project_name</th>
            <th>Requestor</th>
            <th>Wo_Description</th>
            <th>xR</th>
            <th >actions</th>
          </tr>
        </thead>
        <tbody>
        {projects.map(project => (
            <tr key={project.project_id}>
              <td style={{padding:"20px 10px"}}>{project.bu}</td>
              <td style={{padding:"20px 10px"}}>{project.wo_number}</td>
              <td style={{padding:"20px 10px"}} >{project.project_name}</td>
              <td style={{padding:"20px 10px"}}>{project.requestor}</td >
              <td style={{padding:"20px 10px"}}>{project.wo_description}</td>
              <td style={{padding:"20px 10px"}}>{project.xr}</td>
              <td>
                <button className="btn btn-info" onClick={()=>{setOpenModal2(true);openEditing(project)}}>
                  edit <i className="fa fa-edit"></i>
                </button>
                
                <button className="btn btn-danger" onClick={()=>deleteProject(project.project_id)} >
                  delete <i className="fa fa-trash" ></i>
                </button>
                
              </td>
            </tr>
              ))}
        </tbody>
        {projecttobeedited ? <EditProjectModal project={projecttobeedited} open={openModal2} onClose={() => setOpenModal2(false)}/> : null}
      </table>
      
   
   </div>
    
    
     
    
  )
}

export default ListProjects