const app = require("express");
const router = app.Router();
const Auth = require("./Auth");
const Exp = require("./Experience");

router.use("/auth", Auth);
router.use("/exp", Exp);

module.exports = router;
