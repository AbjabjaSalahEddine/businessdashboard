import axios from "axios";
import '../App.css'
import { useNavigate } from 'react-router'
import logo from '../LearLogo.png'
import { NavLink } from 'react-router-dom'
import Swal from 'sweetalert2'

const hostIp = window.location.href.split(":")[0]+":"+window.location.href.split(":")[1]+":5000"

const Navbar = () => {
  const navigate = useNavigate()
  
  const onInputChangeFile=e =>  {
    Swal.fire({
      title: 'Thanks For Waiting',
      html: 'uploading , reading , filtering ... can take a while',
      allowOutsideClick: false,
      allowEscapeKey:false,
      didOpen: () => {
        Swal.showLoading()
      }
    })
    console.log(e.target.files[0])
    var data=new FormData();
    data.append('file',e.target.files[0]);
    const url=hostIp+'/api/dashboard/upload';
    axios.post(url, data , {headers: {"Content-Type": "multipart/form-data"}})
    .then((res) => {
      
      Swal.fire({
        title: JSON.parse(JSON.stringify(res)).data.msg,
        icon: 'success',
        timer: 1600,
        allowOutsideClick: false,
        allowEscapeKey:false,
        showConfirmButton:false
      })
      // alert(JSON.parse(JSON.stringify(res)).data.msg)
      setTimeout(() => {
        navigate("/dashboard")
        window.location.reload();
      }, 1600);
      
      
      
    })
    .catch((e) => {
      console.log(data)
      alert(JSON.parse(JSON.stringify(e.response)).data.msg)
      window.location.reload();
    })
  }
  


  const logout=()=>{
    localStorage.clear();
  }
  
  return (
   
    <nav  style={{height:"55px"}}>
      <a href="https://www.lear.com/" target="_blank" className='logo'>
      <img src={logo} alt="React Logo" height={"40px"} />
      </a>
      
      <div className={"links-wrapper"}>
        <NavLink to="/employees" className={"Nav-Link "} style={window.location.pathname[2]==='m' ?{  borderBottom:  "3px solid black" ,fontWeight:"bold",color:"#ff0021", backgroundColor:"Gainsboro"}:{}} >Manage Employees</NavLink>
        <NavLink to="/Dashboard" className={"Nav-Link "} style={window.location.pathname[2]==='a' ?{  borderBottom:  "3px solid black" ,fontWeight:"bold",color:"#ff0021", backgroundColor:"Gainsboro"}:{}}>DASHBOARD</NavLink>
        <NavLink to="/projects" className={"Nav-Link "} style={window.location.pathname[2]==='r' ?{  borderBottom:  "3px solid black" ,fontWeight:"bold",color:"#ff0021", backgroundColor:"Gainsboro"}:{}}>Manage Projects</NavLink>
      </div>
      <div className="dropdown">
            <button className="dropbtn" >Admin 
                <i style={{margin:'0px 10px'}} className="fa fa-caret-down"></i>
            </button>
            <div className="dropdown-content" >
                <label htmlFor="fu1" className={"Nav-Linkk"} style={{width:'100%'}} >
                <a style={{display:"flex" , alignItems:'center'}}>
                  <i className="fa fa-upload"></i><p style={{margin:'0px 10px'}}>Update Data</p>
                  <input id="fu1" type="file" name="file" accept=".xlsx" onChange={onInputChangeFile}/>
                </a>
                
                </label>
                
                <NavLink to="/changepassword"  className={"Nav-Link"} style={{display:"flex" , alignItems:'center'}}>
                  <i className="fa fa-key"></i><p style={{margin:'0px 10px'}}>Change Password</p>
                </NavLink>
                <NavLink to="/Sign-in" onClick={logout} className={"Nav-Link"} style={{display:"flex" , alignItems:'center',width:'100%'}}>
                <i className="fa fa-sign-out"></i><p style={{margin:'0px 10px'}}>LogOut</p>
                </NavLink>
            </div>
        </div>

 

    </nav>  
    
    
     
    
  )
}

export default Navbar