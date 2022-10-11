const express = require('express')
const router = express.Router()
const {protect} = require("../Middleware/authMiddleware")
const {getAllUsers} = require("../controllers/superVisorController")

router.get('/getAllUsers',protect,getAllUsers)

module.exports =router
