const app = require("express")
const router = app.Router()
const Auth = require("./Auth")
const Profile = require("./Profile")
const Skill = require('./Skill')
const Porto = require('./Porto')
const Home = require('./Home')

router.use('/auth', Auth)
router.use('/profile', Profile)
router.use('/skill', Skill)
router.use('/porto', Porto)
router.use('/home', Home)
module.exports = router;
