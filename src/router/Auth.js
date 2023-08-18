const {login,register,verify} = require("../controller/AuthRecruiterController")
const express = require('express');
const { Router } = require("express");
const router = express.Router()
const upload = require("../midleware/UploadPhoto");

router.post('/recruiter/login',login)
router.post('/recruiter/register',register)
router.get('/verify/:id',verify)



module.exports = router;