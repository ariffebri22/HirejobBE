const app = require("express");
const router = app.Router();
const { Protect } = require("../midleware/Protect");
const { postMessage} = require("../controller/MessageController");

router.post("/", Protect, postMessage);


module.exports = router;
