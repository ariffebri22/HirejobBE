const app = require("express")
const router = app.Router()
const Auth = require("./Auth")


router.use('/auth', Auth)

module.exports = router;
