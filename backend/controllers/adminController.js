const asyncHandler = require('express-async-handler')
const UserModel = require('../model/UserModel')

const getAllSupervisors = asyncHandler(async(req,res)=>{
    try{
        const users = await UserModel.find({})
        console.log(users,"ddddddddddd") 
        res.status(200).json({
            message:'Users fetched succesfully',
            data:users,
            success:true
        })
    }catch(error){
        res.status(500).send({ 
            message:'Error getting users'
             

        })
    }
})
module.exports = {getAllSupervisors}