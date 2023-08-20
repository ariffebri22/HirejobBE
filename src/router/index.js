const app = require("express")
const router = app.Router()
const AuthProfile = require("./AuthProfile")
const Skill = require('./Skill')
const Porto = require('./Porto')
const Home = require('./Home')

router.use('/auth', AuthProfile)
router.use('/skill', Skill)
router.use('/porto', Porto)
router.use('/home', Home)
module.exports = router;
