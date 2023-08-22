const app = require("express");
const router = app.Router();
const { Protect } = require("../midleware/Protect");
const { postMessage,getCompanyById,getMessageId} = require("../controller/MessageController");

router.post("/", Protect, postMessage);
router.get("/waw/:id", Protect, getCompanyById);
router.get("/message/:id", Protect, getMessageId);



module.exports = router;
