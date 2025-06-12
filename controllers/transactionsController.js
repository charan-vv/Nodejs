const transactions = require("../models/transactions");
const {
  list_request,
  create_request,
  update_request,
  softDelete_request,
  hardDelete_request,
} = require("../services/curd");
const {
  internal_Server_Response,
  response,
  no_token_response,
} = require("../helpers/response");
const { extractToken } = require("../helpers/userDetails");

const transaction_list = async (req, res) => {
  try {
    const token = extractToken(req);

    if (!token) {
      no_token_response(res);
    }
    const filters = {};
    const result = await list_request(
      token,
      filters,
      transactions,
      "Transaction"
    );
    response(res, result);
  } catch (err) {
    internal_Server_Response(res, err);
  }
};

const transaction_create = async (req, res) => {
  try {
    const token = extractToken(req);

    if (!token) {
      no_token_response(res);
    }
    const data = req.body;
    const result = await create_request(
      token,
      data,
      transactions,
      "Transaction"
    );
    response(res, result);
  } catch (err) {
    internal_Server_Response(res, err);
  }
};

const transaction_update = async (req, res) => {
  try {
    const token = extractToken(req);

    if (!token) {
      no_token_response(res);
    }
    const uid = req.params.id;
    const data = req.body;
    const result = await update_request(
      token,
      uid,
      data,
      transactions,
      "Transaction"
    );
    response(res, result);
  } catch (err) {
    internal_Server_Response(res, err);
  }
};

const transaction_soft_delete = async (req, res) => {
  try {
    const token = extractToken(req);

    if (!token) {
      no_token_response(res);
    }

    const uid = req.params.id;
    const result = await softDelete_request(
      token,
      uid,
      transactions,
      "Transaction"
    );
    response(res, result);
  } catch (err) {
    internal_Server_Response(res, err);
  }
};

const transaction_hard_delete = async (req, res) => {
  try {
    const uid = req.params.id;
    const result = await hardDelete_request(uid, transactions, "Transaction");
    response(res, result);
  } catch (err) {
    internal_Server_Response(res, err);
  }
};

module.exports = {
  transaction_list,
  transaction_create,
  transaction_update,
  transaction_soft_delete,
  transaction_hard_delete,
};
