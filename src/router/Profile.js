const app = require("express");
const router = app.Router();
const { Protect } = require("../midleware/Protect");
const upload = require("../midleware/UploadPhoto");
const { postWorkers, getWorkersById, putWorkers } = require("../controller/ProfileWorkersController");

router.post("/workers/", Protect, upload.single("photo_worker"), postWorkers);
router.put("/workers/update/:id", Protect, upload.single("photo_worker"), putWorkers)
router.get("/workers/:id", Protect, getWorkersById)

module.exports = router;
