import React,{ useState,useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link,useLocation, useNavigate} from "react-router-dom"
import './dashboard.css'
import {logout,reset}  from '../redux/features/Auth/authSlice'

function Dashboard({children}) {

  const dispatch=useDispatch()
  const navigate=useNavigate()

  const onLogout  = () =>{
    dispatch(logout())
    dispatch(reset())
    navigate("/login")
}

  const { user } = useSelector((state) => state.auth);
    
  useEffect(() => {
    
  if(!user){
    navigate("/login")
  }

  }, [])
  
  
  console.log(user,"777777")  
  const [collapsed, setCollapsed] = useState(false)
    const location = useLocation()
    const adminMenu =[
      {
      name: 'Supervisor List',
      path:'/supervisors',
      icon:"ri-home-2-line"
      },
      {
        name:'Users List',
        path:'/allusers',
        icon:"ri-grid-fill"
      },
      {
        name:'Leave details',
        path:'/leaveRequest',
        icon:"ri-user-line"
      },
      
      {
        name:'Logout',
        path:'/logout',
        icon:"ri-logout-box-line"
      },
  ]

    const SuperVisorMenu =[
      {
        name:'Users List',
        path:'/allusers',
        icon:'ri-dashboard-fill'
      },
      {
        name:'Leave Requests',
        path:'/leaveRequest',
        icon:'ri-car-line'
      },
      {
        name:'Logout',
        path:'/logout',
        icon:"ri-logout-box-line"
      },

    ]

    const userMenu=[
        {
            name:'Create Leave',
            path:'/addleave',
            icon:'ri-dashboard-fill'
          },
          {
            name:'Application status',
            path:'/host/myCars',
            icon:'ri-car-line'
          },
          {
            name:'Logout',
            path:'/logout',
            icon:"ri-logout-box-line"
          },
          
    ]


    const menuToBeRendered = user?.isAdmin?adminMenu : user?.isSupervisor?SuperVisorMenu:userMenu
    const role = user?.isAdmin?"Admin" : user?.isSupervisor? "supervisor":"User"
    return (
    <div className='main p-2'>
      
      <div className='d-flex layout'> 
          
          <div className='sidebar' sx={{}}>
              <div className="sidebar-header">
                  <h1>{role}</h1>
              </div>
              <div className="menu">
                    {menuToBeRendered?.map((menu)=>{
                        const isActive= location.pathname===menu.path
                        return <div className={`d-flex menu-item ${isActive&&'active-menu-item'}`}>
                                  <i className={menu.icon}></i>
                                  {!collapsed && <Link sx={{paddingRight:"50px" }} to={menu.path}>{menu.name}</Link>}
                                  
                              </div>
                    })}
              </div>
          </div>
          
          <div className="content">
            
              <div className="header ">
                   <div>
                        {collapsed ? (
                        <i className="ri-menu-line header-action-icon" onClick={()=>setCollapsed(false)}></i>
                         ):(
                        <i className="ri-close-line header-action-icon" onClick={()=>setCollapsed(true)}></i>
                         )}

                   </div>
                    <div className='header-righ-end'>
                    
                        <h3>{user.name}</h3>
                        <button onClick={onLogout} >Logout</button>
                      
                    </div>
                      
              </div>
              <div className='d-flex'>
                      
                    
              </div>
              <div className="body">
                    {children}
              </div>
          </div>
      </div>
      
    </div>
  ) 
}

export default Dashboard
