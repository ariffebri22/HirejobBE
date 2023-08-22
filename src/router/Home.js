const app = require("express");
const router = app.Router();
const { getDataSearch, getDataHiring, getDataHire} = require("../controller/HomeController");

router.get("/", getDataSearch)
router.get("/:id", getDataHiring)
router.get("/hire/:id", getDataHire)

module.exports = router;
