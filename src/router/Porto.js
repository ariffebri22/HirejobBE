const app = require("express");
const router = app.Router();
const { Protect } = require("../midleware/Protect");
const upload = require("../midleware/UploadPhoto");
const { postWorkers, getWorkersById, putWorkers } = require("../controller/PortoWorkersController");

router.post("/workers/", Protect, upload.single("porto_photo"), postWorkers);
router.put("/workers/update/:id", Protect, upload.single("porto_photo"), putWorkers)
router.get("/workers/:id", Protect, getWorkersById)

module.exports = router;
