const express=require('express')
const router=express.Router()

// controller
const userController =require('../controllers/userController')


// auth route

router.get('/login',userController.login)
router.post('/register',userController.signup)





module.exports=router
