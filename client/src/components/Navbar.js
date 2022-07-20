import axios from "axios";
import '../App.css'
import { useNavigate } from 'react-router'
import logo from '../LearLogo.png'
// import { logout } from '../../Redux/actions/auth'
import { NavLink } from 'react-router-dom'


const Navbar = () => {
  const navigate = useNavigate()

  const onInputChangeFile=e =>  {
    var data=new FormData();
    data.append('file',e.target.files[0]);
    const url='//localhost:5000/api/dashboard/upload';
    axios.post(url, data , {headers: {"Content-Type": "multipart/form-data"}})
    .then((res) => {
      console.log(res)
      alert(JSON.parse(JSON.stringify(res)).data.msg)
      navigate('/Dashboard')
    })
    .catch((e) => {
      console.log(data)
      alert(JSON.parse(JSON.stringify(e.response)).data.msg)
      
    })
  }
  


  const logout=()=>{
    localStorage.clear();
  }
  
  return (
   
    <nav  style={{height:"50px"}}>
      <a href="https://www.lear.com/" target="_blank" className='logo'>
      <img src={logo} alt="React Logo" height={"40px"} />
      </a>

      <div className={"links-wrapper"}>
        <NavLink to="/employees" className={"Nav-Link"} >manage employees</NavLink>
        <NavLink to="/Dashboard" className={"Nav-Link"} >DASHBOARD</NavLink>
        <NavLink to="/projects" className={"Nav-Link"} >manage Projects</NavLink>
        
      </div>
      <div className="dropdown">
            <button className="dropbtn" >Admin 
                <i style={{margin:'0px 10px'}} className="fa fa-caret-down"></i>
            </button>
            <div className="dropdown-content">
                <label htmlFor="fu1" className={"Nav-Linkk"} style={{width:'100%'}} >
                <a style={{display:"flex" , alignItems:'center'}}>
                  <i className="fa fa-upload"></i><p style={{margin:'0px 10px'}}>Update Data</p>
                  <input id="fu1" type="file" name="file" accept=".csv" onChange={onInputChangeFile}/>
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