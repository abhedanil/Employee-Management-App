const express = require('express')
const router = express.Router()
const {ApplyForm,getAllApplications,approveApplication} = require("../controllers/applicationController")
const {protect} = require("../Middleware/authMiddleware")

router.post("/leaveform",protect,ApplyForm)
router.get("/allApplication",protect,getAllApplications)
router.post("/approveApplication",protect,approveApplication)
module.exports =router