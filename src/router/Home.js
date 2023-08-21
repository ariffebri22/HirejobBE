const app = require("express");
const router = app.Router();
const { getDataSearch, getDataHiring } = require("../controller/HomeController");

router.get("/", getDataSearch)
router.get("/:id", getDataHiring)

module.exports = router;
