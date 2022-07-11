
import './App.css';
import SignIn from './pages/SignIn';
import Dashboard from './pages/Dashboard';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Changepassword from './pages/ChangePassword';
import Employees from './pages/Employees';
import Projects from './pages/Projects';


function App() {
  return (
    
    <Router>
      <Routes>
        <Route exact path="" element={<SignIn/>}/>
        <Route exact path="/sign-in/" element={<SignIn/>}/>
        <Route exact path="/dashboard/" element={<Dashboard/>}/>
        <Route exact path="/changepassword/" element={<Changepassword/>}/>
        <Route exact path="/employees/" element={<Employees/>}/>
        <Route exact path="/projects/" element={<Projects/>}/>

      </Routes>
    </Router>

    
  );
}

export default App;
