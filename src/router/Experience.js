const { getData, getDataById, getDataByWorkers, deleteDataById, postData, putData, getDataDetail } = require("../controller/ProfileExperienceController");
const express = require("express");
const { Router } = require("express");
const router = express.Router();
const { Protect } = require("../midleware/Protect");

router.get("/", Protect, getData);
router.get("/detail", getDataDetail);
router.post("/", Protect, postData);
router.put("/:id", Protect, putData);
router.get("/:id", getDataById);
router.get("/users/:id", getDataByWorkers);
router.delete("/:id", Protect, deleteDataById);

module.exports = router;
