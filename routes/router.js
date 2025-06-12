const express=require('express')
const router=express.Router()

// controller
const authController =require('../controllers/authController')
const dashboardController =require('../controllers/dashboardController')
const transactionsController =require('../controllers/transactionsController')
// Authentication
const authenticationToken =require('../middlewares/authentication')



// auth route

router.post('/login',authController.login_request)
router.post('/signup',authController.signup_request)
router.post('/get-otp',authController.Otp_request)
router.post('/verify-otp',authController.verifyotp_request)
router.post('/reset-password/:id',authController.updateDetails_request)
router.put('/user/:id',authenticationToken,authController.updateDetails_request)
router.delete('/soft/user/:id',authenticationToken,authController.softDelete_request)
router.delete('/hard/user/:id',authenticationToken,authController.hardDelete_request)


// other routers
router.get('/dashboard',authenticationToken,dashboardController.dashboard_get)


// Budget routers


// transactions routers

router.get('/transaction/list',authenticationToken,transactionsController.transaction_list)
router.post('transaction/create',authenticationToken,transactionsController.transaction_create)
router.put('transaction/update/:id',authenticationToken,transactionsController.transaction_update)
router.delete('transaction/soft/:id',authenticationToken,transactionsController.transaction_soft_delete)
router.delete('transaction/hard/:id',authenticationToken,transactionsController.transaction_hard_delete)


module.exports=router
