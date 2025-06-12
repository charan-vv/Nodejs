const {
  list_request,
  create_request,
  update_request,
  soft_delete,
  hard_delete,
} = require("../services/transactions.js");

const {extractToken} =require("../middlewares/tokenExtraction.js")

const transaction_list = async (req, res) => {
  try {
    const token = extractToken(req);
    
    if (!token) {
      return res.status(401).json({
        success: false,
        code: 401,
        message: "Access token is required"
      });
    }

    // Extract filters from query parameters
    const filters = {
      status: req.query.status,
      dateFrom: req.query.dateFrom,
      dateTo: req.query.dateTo,
      page: req.query.page,
      limit: req.query.limit
    };

    const result = await list_request(token, filters);
    
    res.status(result?.status).json({
      success: result?.success,
      code: result?.status,
      message: result?.message,
      data: result?.data || null,
      count: result?.count || 0
    });
  } catch (err) {
    res.status(500).json({
      code: 500,
      error: err?.message,
      success: false,
      message: "Internal Server Error",
    });
  }
};
const transaction_create = async (req, res) => {
  try {
    const data = req.body;
    const result = await create_request(data);
    res.status(result?.status).json({
      success: result?.success,
      code: result?.status,
      message: result?.message,
    });
  } catch (err) {
    res.status(500).json({
      code: 500,
      error: err?.message,
      success: false,
      message: "Internal Server Error",
    });
  }
};

const transaction_update = async (req, res) => {
  try {
    const uid = req.params.id;
    const data = req.body;
    const result = await update_request(uid, data);
    res.status(result?.status).json({
      success: result?.success,
      code: result?.status,
      message: result?.message,
    });
  } catch (err) {
    res.status(500).json({
      code: 500,
      error: err?.message,
      success: false,
      message: "Internal Server Error",
    });
  }
};

const transaction_soft_delete = async (req, res) => {
  try {
    const uid = req.params.id;
    const result = await soft_delete(uid);
    res.status(result?.status).json({
      success: result?.success,
      code: result?.status,
      message: result?.message,
    });
  } catch (err) {
    res.status(500).json({
      code: 500,
      error: err?.message,
      success: false,
      message: "Internal Server Error",
    });
  }
};

const transaction_hard_delete = async (req, res) => {
  try {
    const uid = req.params.id;
    const result = await hard_delete(uid);
    res.status(result?.status).json({
      success: result?.success,
      code: result?.status,
      message: result?.message,
    });
  } catch (err) {
    res.status(500).json({
      code: 500,
      error: err?.message,
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  transaction_list,
  transaction_create,
  transaction_update,
  transaction_soft_delete,
  transaction_hard_delete,
};
