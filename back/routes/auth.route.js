const express = require("express")
const router = express.Router()
const {  authcontroller } = require("./../controllers/index.controller.js")

router.post('/login', authcontroller.login)
router.post('/register', authcontroller.register)
router.get('/logout', authcontroller.logout)
router.get('/me', authcontroller.me)

module.exports = router
