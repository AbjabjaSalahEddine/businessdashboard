
import '../App.css'
import logo from '../LearLogo.png'
import { Link } from 'react-router-dom'
// import { logout } from '../../Redux/actions/auth'
import { useNavigate } from 'react-router'
import { NavLink } from 'react-router-dom'


const Navbar = () => {

  
  const logout=()=>{
    localStorage.clear();
  }


  return (
   
    <nav style={{height:"50px"}}>
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
                <NavLink to="/dashboard" className={"Nav-Link"} style={{display:"flex" , alignItems:'center'}}>
                    <p style={{margin:'0px 10px'}}>Update Data</p>
                </NavLink>
                <NavLink to="/changepassword"  className={"Nav-Link"} style={{display:"flex" , alignItems:'center'}}>
                    <p style={{margin:'0px 10px'}}>Change Password</p>
                </NavLink>
                <NavLink to="/Sign-in" onClick={logout} className={"Nav-Link"} style={{display:"flex" , alignItems:'center'}}>
                    <p style={{margin:'0px 10px'}}>LogOut</p><i className="fa fa-sign-out"></i>
                </NavLink>
            </div>
        </div>

 

    </nav>  
    
    
     
    
  )
}

export default Navbar