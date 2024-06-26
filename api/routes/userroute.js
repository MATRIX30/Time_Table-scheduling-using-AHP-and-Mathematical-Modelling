const express=require('express')
const app=express()
const router = express.Router();
const admincontroller= require('../controller/user')
const authentification=require('../authentification')

router.post('/login',admincontroller.UserLogin)
router.post('/signup',admincontroller.UserSignup)
router.post('/add',admincontroller.addpreference)
//router.post('/add',authentification,admincontroller.addpreference)

module.exports=router