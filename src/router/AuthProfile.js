const {login,register,verify,getDataCompany,putRecruiter,getRecruiterById} = require("../controller/AuthProfilCompanyController")
const {loginWorker,registerWorker,verifyWorker,changeDataWorker, getWorkersById, putWorkers} = require("../controller/AuthProfileWorkersController")

const express = require('express');
const { Router } = require("express");
const router = express.Router();
const upload = require("../midleware/UploadPhoto");
const { Protect } = require("../midleware/Protect");

router.post('/recruiter/login',login)
router.post('/recruiter/register',register)
router.put('/recruiter/changepassword', Protect)
router.get('/verify/:id',verify)
router.put('/recruiter/update/:id',Protect,upload.single('photo'),putRecruiter)
router.get('/detail',getDataCompany)
router.get("/recruiter/:id", Protect, getRecruiterById)

router.post('/workers/login',loginWorker)
router.post('/workers/register',registerWorker)
router.put('/workers/changepassword', Protect, changeDataWorker)
router.get('/verifyworker/:id',verifyWorker)

router.put("/workers/update/:id", Protect, upload.single("photo_worker"), putWorkers)
router.get("/workers/:id", Protect, getWorkersById)



module.exports = router;