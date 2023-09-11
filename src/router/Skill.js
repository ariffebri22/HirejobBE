const app = require("express");
const router = app.Router();
const { Protect } = require("../midleware/Protect");
const { postWorkers, getWorkersById, putWorkers } = require("../controller/SkillWorkersController");

router.post("/workers/", Protect, postWorkers);
router.put("/workers/update/:id", Protect, putWorkers);
router.get("/workers/:id", Protect, getWorkersById);

module.exports = router;
