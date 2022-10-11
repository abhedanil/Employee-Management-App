import React from 'react'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import axios from 'axios';
import { toast } from 'react-toastify'
import {

    Grid,
    TextField,
    Typography,


} from "@mui/material";

import Dashboard from './Dashboard';


function LeaveForm() {

    const { user } = useSelector((state) => state.auth)
    const token = user.token
    const [formData, setFormData] = useState({
        name: '',
        reason: '',
        startdate: '',
        enddate: '',
    })
    const { name, reason, startdate, enddate } = formData
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }


    const onSubmit = async (e) => {
        e.preventDefault()
        const formData = { name, reason, startdate, enddate }
        try {
            const response = await axios.post("http://localhost:5000/api/application/leaveform", {
                ...formData
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log(response)
            if (response.data.data.success) {
                toast.success(response.data.message)
                navigate('/')
            }

        } catch (error) {
            console.log(error)
        }


    }



    return (
        <Dashboard>

            <div style={{ margin: "30px 0" }}>


                <form onSubmit={onSubmit}>
                    <Grid container spacing={1}>
                        <Grid xs={12} lg={6} sm={6} sx={{}} item>
                            <TextField sx={{ width: 400 }} type="text" label="name" className="form-control"
                              name="name"
                                value={name}
                                placeholder=" name"
                                onChange={onChange} fullWidth />
                        </Grid>

                        <Grid xs={12} lg={6} item>
                            <TextField sx={{ width: 400, mt: 3 }} type="text" label="Reason" className="form-control"
                               name="reason"
                                value={reason}
                               
                                onChange={onChange} fullWidth />
                        </Grid>
                        <Grid xs={12} lg={6} item>
                            <Typography>Start date</Typography>
                            <TextField sx={{ width: 400, mt: 3 }} type="date" className="form-control"
                               name="startdate"
                                value={startdate}
                                
                                onChange={onChange} fullWidth />
                        </Grid>
                        <Grid xs={12} lg={6} item> 
                        <Typography>End date</Typography>
                            <TextField sx={{ width: 400, mt: 3 }} type="date" className="form-control"
                               name="enddate"
                                value={enddate}
                                
                                onChange={onChange} fullWidth />
                        </Grid>


                        <Grid lg={12} align="center" sx={{ pt: 2 }} item>
                            <button type="submit" className=' btn btn-primary'>Submit</button>
                        </Grid>

                    </Grid>
                </form>



            </div>


        </Dashboard>

    )

}

export default LeaveForm
