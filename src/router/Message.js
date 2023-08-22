const app = require("express");
const router = app.Router();
const { Protect } = require("../midleware/Protect");
const { postDataMessage} = require("../controller/MessageController");

router.post("/:id", Protect, postDataMessage);



module.exports = router;
