const express = require("express")
const router = express.Router()
const preferenceroute = require("./preferences.route")
const authroute = require("./auth.route")
const authMiddleware = require("../middlewares/auth.middleware")


router.use('/auth', authroute)
router.use('/preference', preferenceroute)
// router.use('/preference', authMiddleware, preferenceroute)

module.exports = router