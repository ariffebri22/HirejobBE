const {login,register,verify, putData} = require("../controller/AuthRecruiterController")
const {loginWorker,registerWorker,verifyWorker,changeDataWorker, getWorkersById, putWorkers} = require("../controller/AuthProfileWorkersController")

const express = require('express');
const { Router } = require("express");
const router = express.Router()
const upload = require("../midleware/UploadPhoto");
const { Protect } = require("../midleware/Protect");

router.post('/recruiter/login',login)
router.post('/recruiter/register',register)
router.put('/recruiter/changepassword', Protect, putData)
router.get('/verify/:id',verify)

router.post('/workers/login',loginWorker)
router.post('/workers/register',registerWorker)
router.put('/workers/changepassword', Protect, changeDataWorker)
router.get('/verifyworker/:id',verifyWorker)

router.put("/workers/update/:id", Protect, upload.single("photo_worker"), putWorkers)
router.get("/workers/:id", Protect, getWorkersById)



module.exports = router;