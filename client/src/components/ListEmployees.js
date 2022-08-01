import axios from "axios";
import '../App.css'
import React, { useEffect, useState } from "react";
import AddEmployeeModal from "./AddEmployeeModal";
import EditEmployeetModal from './EditEmployeeModal'

const ListEmployees = () => {
    const [employees, setEmployees] = useState([]);
    const [openModal1,setOpenModal1]=useState(false)
    const [openModal2,setOpenModal2]=useState(false)
    const [employeetobeedited,setEmployee]=useState();
    const [search,setSearch]=useState('')
    const [data,setData]=useState()

  
    const openEditing = (employee)=>{
      setEmployee(employee);
    }
  
    const getEmployees = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/employee");
        const jsonData = await response.json();
        setData(jsonData)
        setEmployees(jsonData);
        
      } catch (err) {
        console.error(err.message);
      }
    };

    
    const deleteEmployee = async (employee_id) => {
      let id=Number(localStorage.getItem("id"))
      let token=localStorage.getItem("token")
      axios.delete("http://localhost:5000/api/employee/"+Number(employee_id),{ data: { id:id,token:token}})
    .then(response=>{
        console.log(id)
        
        alert(JSON.parse(JSON.stringify(response)).data.msg)
        getEmployees()
        
    })
    .catch(error=>{
      console.log(token)
        console.log(JSON.parse(JSON.stringify(error.response)).data.msg);
        alert(JSON.parse(JSON.stringify(error.response)).data.msg)
    })
    };
    const handleSubmit= (e)=>{
      e.preventDefault()
      console.log(employees)
      filtersearch()
    }
    
    const filtersearch =()=>{

      const p = data.filter(employee => employee.drts_full_name.toUpperCase().includes(search.toUpperCase()));
      setEmployees(p)
      
    }
    useEffect(() => {
      getEmployees();
      
    },[]);

  
  return (
   
   <div style={{width:'90%',margin:'auto'}}>
    <nav className="justify-content-between" style={{position:"unset",width:'90%',margin:'auto'}}>
      <button type="button" className="btn btn-outline-success modalButton" style={{borderRight:'solid 1px black',padding:'10px 20px'}}  onClick={()=>setOpenModal1(true)}>Add an Employee <i className="fa fa-plus"></i></button>
        <AddEmployeeModal open={openModal1} onClose={() => setOpenModal1(false)} />
        <form onSubmit={e => handleSubmit(e)} style={{whidth:'400px'}} className="d-flex">
            <input type="search" onChange={(e)=> setSearch(e.target.value)}  placeholder='Employee Name'/>
            <button className="btn btn-outline-warning my-2 my-sm-0" type="submit">Search <i className="fa fa-search"></i></button>
        </form>
</nav>
   <table id='employeetable' className="table mt-5 text-center">
        <thead>
          <tr>
            <th>DRTS name</th>
            <th>DRTS id</th>
            <th>System id</th>
            <th>System login</th>
            <th>Position</th>
            <th>Reports to</th>
            <th>Integration date</th>
            <th>Exit date</th>
            <th>Birth date</th>
            <th>CIN</th>
            <th>Phone Number</th>
            <th style={{width:'180px'}}>actions</th>
          </tr>
        </thead>
        <tbody>
        {employees.map(employee => (
            <tr key={employee.emp_id}>
              <td style={{padding:"20px 10px"}}>{employee.drts_full_name}</td>
              <td style={{padding:"20px 10px"}}>{employee.drts_id}</td>
              <td style={{padding:"20px 10px"}} >{employee.system_id}</td>
              <td style={{padding:"20px 10px"}} >{employee.system_login}</td>
              <td style={{padding:"20px 10px"}}>{employee.position}</td >
              <td style={{padding:"20px 10px"}}>{employee.reports_to}</td>
              <td style={{padding:"20px 10px"}}>{employee.integration_date?employee.integration_date.slice(0, 10):null}</td>
              <td style={{padding:"20px 10px"}}>{employee.exit_date?employee.exit_date.slice(0, 10):null}</td>
              <td style={{padding:"20px 10px"}}>{employee.birth_date?employee.birth_date.slice(0, 10):null}</td>
              <td style={{padding:"20px 10px"}}>{employee.cin}</td>
              <td style={{padding:"20px 10px"}}>{employee.phone_number}</td>

              <td>
                <button className="btn btn-info" onClick={()=>{setOpenModal2(true);openEditing(employee)}}>
                  edit <i className="fa fa-edit"></i>
                </button>
                
                <button className="btn btn-danger" onClick={()=>deleteEmployee(employee.emp_id)} >
                  delete <i className="fa fa-trash" ></i>
                </button>
                
              </td>
            </tr>
              ))}
        </tbody>
        {employeetobeedited ? <EditEmployeetModal employee={employeetobeedited} open={openModal2} onClose={() => setOpenModal2(false)}/> : null}
      </table>
      
   
   </div>
    
    
     
    
  )
}

export default ListEmployees