const express = require('express')
const router = express.Router()
const{registerUser,loginUser} = require("../controllers/userController")
const {ApplyForm} = require("../controllers/applicationController")

router.post('/register',registerUser)
router.post('/login',loginUser)


module.exports =router