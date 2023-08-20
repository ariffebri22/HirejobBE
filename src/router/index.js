const app = require("express");
const router = app.Router();
const Auth = require("./Auth");
const Profile = require("./Profile");
const Skill = require("./Skill");
const Porto = require("./Porto");
const Home = require("./Home");
const Exp = require("./Experience");

router.use("/auth", Auth);
router.use("/profile", Profile);
router.use("/skill", Skill);
router.use("/porto", Porto);
router.use("/home", Home);
router.use("/exp", Exp);
module.exports = router;
