import React,{useState,useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import { Avatar, Grid, Paper, Typography, TextField, Button } from '@mui/material'
import LockOpenIcon from '@mui/icons-material/LockOpen';

import {toast} from 'react-toastify'

import { Box } from '@mui/system'
import {register,reset} from "../redux/features/Auth/authSlice"
import axios from 'axios';
function Signup() {


    const paperStyle = { padding: '30px 20px', width: 500, margin: '70px auto', }
    const headerStyle = { margin: "10px 0", }
    const avatarStyle = { backgroundColor: '#1bbd72' }

    const [formData,setFormData] = useState({
        name:'',
        email:'',
        phone:'',
        password:'',
        password2: '',
    })
    const {name,email,phone,password,password2}= formData

    const navigate=useNavigate()
    const dispatch= useDispatch()
 
    const {user,isLoading,isError,isSuccess,message}= 
    useSelector(
        (state)=> state.auth
    )

    useEffect(()=>{
        if(isError){
            toast.error(message)
        }
        if(isSuccess || user){
            navigate('/')
        }
        dispatch(reset())

    },[user,isError,isSuccess,message,navigate,dispatch])


    const onChange=(e)=>{
        setFormData((prevState)=>({
            ...prevState,
            [e.target.name] :e.target.value,
        }))
    }
    


    const onSubmit = async (e) =>{
        e.preventDefault()

        if(password !==password2){
            toast.error('password do not match')
        }
        else{
            const userData ={
                name,
                email,
                phone,
                password
            }
            try{
                dispatch(register(userData))

            }catch(error){

            }
            
        }
    }


    return (
        <div>     
            <Grid >
                <Paper elevation={20} style={paperStyle}>
                    <Grid align="center">
                        <Avatar style={avatarStyle}>
                            <LockOpenIcon />
                        </Avatar>
                        <h2 style={headerStyle} >Signup</h2>
                    </Grid>
                    <form onSubmit={onSubmit}>
                        <TextField label='Name' type="text"name="name" value={name} fullWidth sx={{ margin: "5px 0" }} onChange={onChange}/>
                        <TextField label='Email' type="text" name="email" value={email} fullWidth sx={{ margin: "5px 0" }}onChange={onChange} />
                        <TextField label='Phone Number' type="text"  name="phone" value={phone} fullWidth sx={{ margin: "5px 0" }} onChange={onChange}/>
                        <TextField label='Password' type="text" name="password" fullWidth value={password} sx={{ margin: "5px 0" }} onChange={onChange} />
                        <TextField label='Confirm password' type="text" name="password2" value={password2} fullWidth sx={{ margin: "5px 0" }} onChange={onChange} />            
                        <Box align="center" sx={{ margin: "10px 0" }}>
                            <Button type="submit" variant="contained" color="primary" align="center">Signup</Button>
                        </Box>

                    </form>
                </Paper>
            </Grid>
        </div>
    )
}

export default Signup