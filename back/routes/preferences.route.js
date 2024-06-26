const express = require("express")
const router = express.Router()
const authMiddleware = require("../middlewares/auth.middleware")
const { preferenceController } = require("../controllers/index.controller.js")

router.post("", preferenceController.create)
router.get("", preferenceController.read)

module.exports = router