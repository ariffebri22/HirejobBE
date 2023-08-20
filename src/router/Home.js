const app = require("express");
const router = app.Router();
const { getDataSearch } = require("../controller/HomeController");

router.get("/", getDataSearch)

module.exports = router;
