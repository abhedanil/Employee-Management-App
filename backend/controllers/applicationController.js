const asyncHandler = require('express-async-handler')
const ApplicationModel = require('../model/applicationModel')




const ApplyForm = asyncHandler(async (req, res) => {
    console.log("inside apply form")
    const user = req.user._id
    console.log(user)
    const { name,reason,startdate,enddate } = req.body   
    console.log(req.body, "ssssssssssssssssss");
    if (!name || !reason || !startdate || !enddate) {
        res.status(400)
        throw new error("Please fill the fields")
    }
    //check if user exist
    try { 
        const newform = new ApplicationModel({ ...req.body, userId: user })
        await newform.save()
  
        res.status(200).json({
            success: true,
            message: "form applied successfully"

        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Error appliying leave form",
            success: false,
            error
        })
    }
})

const getAllApplications = asyncHandler(async(req,res)=>{
    console.log("enter get all apps")
    try{
        const allApps= await ApplicationModel.find({})
        console.log(allApps)
        res.status(200).json({
            data:allApps,
            success:true
        })    
    }catch(error){
        throw new Error("error getting applications")
    }
}) 

const approveApplication= asyncHandler(async(req,res)=>{  
    // console.log("inside changeHoststatus");
    // console.log(req.body,"gfghfghfghfghf");
    const {formId} = req.body
    console.log(formId);
    try{
       const statusUpdated = await ApplicationModel.findByIdAndUpdate(
        formId,
        {$set:{approved:true}}
        ) 
        res.status(200).json({
            success:true,
            message:"Application approved",

        })
       
    }catch(error){
        console.log(error)
        res.status(304).json({
            success:false,
            error
        })
    }
})




module.exports = {ApplyForm,getAllApplications,approveApplication}