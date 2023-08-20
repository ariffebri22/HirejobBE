const {getDataCompany,postDataCompany} = require("../controller/ProfilrRecruiterController")


const express = require('express');
const { Router } = require("express");
const router = express.Router()
const upload = require("../midleware/UploadPhoto");
const { Protect } = require("../midleware/Protect");


router.post('/company',Protect,upload.single('photo'),postDataCompany)
router.get('/company/detail',getDataCompany)



module.exports = router;