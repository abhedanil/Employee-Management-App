const express = require('express')
const router = express.Router()

const {protect} = require("../Middleware/authMiddleware")
const {getAllSupervisors} = require("../controllers/superVisorController"

)

router.get("/getAllsupervisors",protect,getAllSupervisors)

module.exports=router