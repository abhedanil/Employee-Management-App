import React,{useState,useEffect} from 'react'
import Dashboard from '../Dashboard'
import { useSelector } from 'react-redux'
import { TableContainer, Table, TableHead, TableRow, TableCell, Paper, TableBody } from '@mui/material'

import axios from 'axios'

function LeaveRequests() {
    const {user}= useSelector((state)=>state.auth)
    const token = user.token

    const [tableData, setTableData] = useState([])
    const leaveApps = async () =>{
        try{
            const response = await axios.get("http://localhost:5000/api/application/allApplication",{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            if (response.data.success) {
                console.log(response.data.data)
                setTableData(response.data.data)
            }
            
        }catch(error){
            console.log("coudn't complete get request")
        }
    }
useEffect(() =>{
    leaveApps()
},[])


const approveForm=async(formId)=>{
    
     const response= await axios.post("http://localhost:5000/api/application/approveApplication",{formId:formId},{
         headers:{
             Authorization:   `Bearer ${token}`
             
         }
     })
     console.log(response,"11111111111111111")
     if (response.data.success) {
         console.log(response.data)
         leaveApps()
     }
 }


  return (
    <Dashboard>
        <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Form Id</TableCell>
                                <TableCell>User Id</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Reason</TableCell>
                                <TableCell>Actions</TableCell>
                               
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tableData.map((row) => (
                                <TableRow key={1} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell>{row._id}</TableCell>
                                    <TableCell>{row.userId}</TableCell>
                                    <TableCell>{row.name}</TableCell>
                                    <TableCell>{row.reason}</TableCell>
                                    <TableCell>{row.approved=="false" ? (
                                        <button className='Approve-button'  onClick={()=>{approveForm(row._id)}}>Approve</button>
                                    ) : (<h3>Approved</h3>)}</TableCell>
                                 
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
    </Dashboard>
  )
}

export default LeaveRequests