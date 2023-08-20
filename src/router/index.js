const app = require("express")
const router = app.Router()
const Auth = require("./Auth")
const Profil = require("./Profil")


router.use('/auth', Auth)
router.use('/profil', Profil)

module.exports = router;
