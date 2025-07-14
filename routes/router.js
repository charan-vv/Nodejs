

const express = require('express');
const router = express.Router();

// controllers
const authController = require('../controllers/authController');
const dashboardController = require('../controllers/dashboardController');
const transactionsController = require('../controllers/transactionsController');
const budgetController = require('../controllers/budgetController');
const categoriesController = require('../controllers/categoryController');

// middleware
const { authenticateToken } = require('../middlewares/authentication');

/**
 * @swagger
 * tags:
 *   - name: Auth
 *   - name: Dashboard
 *   - name: Transactions
 *   - name: Budget
 *   - name: Categories
 *   - name: Settings
 */

//
// ─── AUTH ROUTES ─────────────────────────────────────────
//

/**
 * @swagger
 * /budget/backend/v1/login:
 *   post:
 *     summary: Login to the system
 *     tags: [Auth]
 */
router.post('/login', authController.login_request);

/**
 * @swagger
 * /budget/backend/v1/signup:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 */
router.post('/signup', authController.signup_request);

/**
 * @swagger
 * /budget/backend/v1/get-otp:
 *   post:
 *     summary: Get OTP for verification
 *     tags: [Auth]
 */
router.post('/get-otp', authController.Otp_request);

/**
 * @swagger
 * /budget/backend/v1/verify-otp:
 *   post:
 *     summary: Verify OTP
 *     tags: [Auth]
 */
router.post('/verify-otp', authController.verifyotp_request);

/**
 * @swagger
 * /budget/backend/v1/reset-password/{id}:
 *   post:
 *     summary: Reset password
 *     tags: [Auth]
 
 */
router.post('/reset-password/:id', authController.updateDetails_request);

/**
 * @swagger
 * /budget/backend/v1/user/{id}:
 *   put:
 *     summary: Update user details
 *     tags: [Auth]
 */
router.put('/user/:id', authenticateToken, authController.updateDetails_request);

/**
 * @swagger
 * /budget/backend/v1/soft/user/{id}:
 *   delete:
 *     summary: Soft delete a user
 *     tags: [Auth]
 */
router.delete('/soft/user/:id', authenticateToken, authController.softDelete_request);

/**
 * @swagger
 * /budget/backend/v1/hard/user/{id}:
 *   delete:
 *     summary: Hard delete a user
 *     tags: [Auth]
 */
router.delete('/hard/user/:id', authenticateToken, authController.hardDelete_request);


//
// ─── DASHBOARD ROUTE ─────────────────────────────────────
//

/**
 * @swagger
 * /budget/backend/v1/dashboard:
 *   get:
 *     summary: Get dashboard data
 *     tags: [Dashboard]
 */
router.get('/dashboard', authenticateToken, dashboardController.dashboard_get);


//
// ─── TRANSACTIONS ROUTES ─────────────────────────────────
//

/**
 * @swagger
 * /budget/backend/v1/transaction/list:
 *   post:
 *     summary: List transactions
 *     tags: [Transactions]
 */
router.post('/transaction/list', authenticateToken, transactionsController.transaction_list);

/**
 * @swagger
 * /budget/backend/v1/transaction/create:
 *   post:
 *     summary: Create a transaction
 *     tags: [Transactions]
 */
router.post('/transaction/create', authenticateToken, transactionsController.transaction_create);

/**
 * @swagger
 * /budget/backend/v1/transaction/update/{id}:
 *   put:
 *     summary: Update a transaction
 *     tags: [Transactions]
 */
router.put('/transaction/update/:id', authenticateToken, transactionsController.transaction_update);

/**
 * @swagger
 * /budget/backend/v1/transaction/soft/{id}:
 *   delete:
 *     summary: Soft delete a transaction
 *     tags: [Transactions]
 */
router.delete('/transaction/soft/:id', authenticateToken, transactionsController.transaction_soft_delete);

/**
 * @swagger
 * /budget/backend/v1/transaction/hard/{id}:
 *   delete:
 *     summary: Hard delete a transaction
 *     tags: [Transactions]
 */
router.delete('/transaction/hard/:id', authenticateToken, transactionsController.transaction_hard_delete);


//
// ─── BUDGET ROUTES ───────────────────────────────────────
//

/**
 * @swagger
 * /budget/backend/v1/budget/list:
 *   post:
 *     summary: List budget records
 *     tags: [Budget]
 */
router.post('/budget/list', authenticateToken, budgetController.budget_list);

/**
 * @swagger
 * /budget/backend/v1/budget/create:
 *   post:
 *     summary: Create a budget record
 *     tags: [Budget]
 */
router.post('/budget/create', authenticateToken, budgetController.budget_create);

/**
 * @swagger
 * /budget/backend/v1/budget/update/{id}:
 *   put:
 *     summary: Update a budget record
 *     tags: [Budget]
 */
router.put('/budget/update/:id', authenticateToken, budgetController.budget_update);

/**
 * @swagger
 * /budget/backend/v1/budget/soft/{id}:
 *   delete:
 *     summary: Soft delete a budget record
 *     tags: [Budget]
 */
router.delete('/budget/soft/:id', authenticateToken, budgetController.budget_soft_delete);

/**
 * @swagger
 * /budget/backend/v1/budget/hard/{id}:
 *   delete:
 *     summary: Hard delete a budget record
 *     tags: [Budget]
 */
router.delete('/budget/hard/:id', authenticateToken, budgetController.budget_hard_delete);


//
// ─── CATEGORY ROUTES ─────────────────────────────────────
//

/**
 * @swagger
 * /budget/backend/v1/category/list:
 *   post:
 *     summary: List categories
 *     tags: [Categories]
 */
router.post('/category/list', authenticateToken, categoriesController.list);

/**
 * @swagger
 * /budget/backend/v1/category/create:
 *   post:
 *     summary: Create a category
 *     tags: [Categories]
 */
router.post('/category/create', authenticateToken, categoriesController.create);

/**
 * @swagger
 * /budget/backend/v1/category/update/{id}:
 *   put:
 *     summary: Update a category
 *     tags: [Categories]
 */
router.put('/category/update/:id', authenticateToken, categoriesController.update);

/**
 * @swagger
 * /budget/backend/v1/category/soft/{id}:
 *   delete:
 *     summary: Soft delete a category
 *     tags: [Categories]
 */
router.delete('/category/soft/:id', authenticateToken, categoriesController.soft_delete);

/**
 * @swagger
 * /budget/backend/v1/category/hard/{id}:
 *   delete:
 *     summary: Hard delete a category
 *     tags: [Categories]
 */
router.delete('/category/hard/:id', authenticateToken, categoriesController.hard_delete);


//
// ─── SETTINGS ────────────────────────────────────────────
//

/**
 * @swagger
 * /budget/backend/v1/user/{id}:
 *   get:
 *     summary: Get user details
 *     tags: [Settings]
 */
router.get('/user/:id', authenticateToken, authController.User_request);


module.exports = router;
