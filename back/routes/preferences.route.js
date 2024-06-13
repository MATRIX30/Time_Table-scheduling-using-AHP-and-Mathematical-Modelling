const express = require("express")
const router = express.Router()
const authMiddleware = require("../middlewares/auth.middleware")
const { preferenceController } = require("../controllers/index.controller.js")

router.get("", preferenceController.create)
router.post("", preferenceController.read)

module.exports = router