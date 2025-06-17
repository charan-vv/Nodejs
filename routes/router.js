const express=require('express')
const router=express.Router()

// controller
const authController =require('../controllers/authController')
const dashboardController =require('../controllers/dashboardController')
const transactionsController =require('../controllers/transactionsController')
const budgetController =require ('../controllers/budgetController')
const categoriesController=require('../controllers/categoryController')


// Authentication
const {authenticateToken} =require('../middlewares/authentication')



// auth route
router.post('/login',authController.login_request)
router.post('/signup',authController.signup_request)
router.get('/user/:id',authenticateToken,authController.User_request)
router.post('/get-otp',authController.Otp_request)
router.post('/verify-otp',authController.verifyotp_request)
router.post('/reset-password/:id',authController.updateDetails_request)
router.put('/user/:id',authenticateToken,authController.updateDetails_request)
router.delete('/soft/user/:id',authenticateToken,authController.softDelete_request)
router.delete('/hard/user/:id',authenticateToken,authController.hardDelete_request)


// dashboard routers    
router.get('/dashboard',authenticateToken,dashboardController.dashboard_get)


// transactions routers
router.post('/transaction/list',authenticateToken,transactionsController.transaction_list)
router.post('/transaction/create',authenticateToken,transactionsController.transaction_create)
router.put('/transaction/update/:id',authenticateToken,transactionsController.transaction_update)
router.delete('/transaction/soft/:id',authenticateToken,transactionsController.transaction_soft_delete)
router.delete('/transaction/hard/:id',authenticateToken,transactionsController.transaction_hard_delete)


// Budget routers
router.post('/budget/list',authenticateToken,budgetController.budget_list)
router.post('/budget/create',authenticateToken,budgetController.budget_create)
router.put('/budget/update/:id',authenticateToken,budgetController.budget_update)
router.delete('/budget/soft/:id',authenticateToken,budgetController.budget_soft_delete)
router.delete('/budget/hard/:id',authenticateToken,budgetController.budget_hard_delete)



// Categories
router.post('/category/list',authenticateToken,categoriesController.list)
router.post('/category/create',authenticateToken,categoriesController.create)
router.put('/category/update/:id',authenticateToken,categoriesController.update)
router.delete('/category/soft/:id',authenticateToken,categoriesController.soft_delete)
router.delete('/category/hard/:id',authenticateToken,categoriesController.hard_delete)



module.exports=router
