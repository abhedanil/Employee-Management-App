import React from 'react';
import {BrowserRouter as Router, Routes,Route} from 'react-router-dom' 
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard'
import LeaveForm from './pages/LeaveForm';
import LeaveRequests from './pages/supervisor/LeaveRequests';
import UsersList from './pages/supervisor/UsersList'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path='/' element={<Dashboard/>}/>
          <Route exact path='/login' element={<Login/>}/>
          <Route exact path="/signup"  element={<Signup/>}/>
          <Route exact path="/addleave" element={<LeaveForm/>} />
          <Route exact path="/leaveRequest" element={<LeaveRequests/>}/>
          <Route exact path="/allusers" element={<UsersList/>}/>
        </Routes>
      </Router>
    
    </> 
  );
}

export default App;
