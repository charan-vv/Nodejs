const express=require('express')
const router=express.Router()

// controller
const authController =require('../controllers/authController')
const dashboardController =require('../controllers/dashboardController')
// Authentication
const authenticationToken =require('../middlewares/authentication')


// auth route

router.post('/login',authController.login_request)
router.post('/signup',authController.signup_request)
router.post('/get-otp',authController.Otp_request)
router.post('/verify-otp',authController.verifyotp_request)
router.post('/reset-password',authController.updateDetails_request)
router.put('/user/:id',authenticationToken,authController.updateDetails_request)
router.delete('/soft/user/:id',authenticationToken,authController.softDelete_request)
router.delete('/hard/user/:id',authenticationToken,authController.hardDelete_request)


// other routers
router.get('/dashboard',authenticationToken,dashboardController.dashboard_get)


module.exports=router
