const budget = require('../models/budget')
const {
  list_request,
  create_request,
  update_request,
  softDelete_request,
  hardDelete_request,
} = require("../services/curd");


const {internal_Server_Response, response} = require("../helpers/response");

const { extractToken } = require("../helpers/userDetails");




// 
const budget_list = async (req, res) => {
  try {
    const token = extractToken(req);
    if (!token) {
      no_token_response(res);
    } 
    const filter={}
    const result = await list_request(token,filter,budget,"Budget");
    response(res, result);
  } catch (err) {
    internal_Server_Response(res, err);
  }
};


const budget_create = async (req, res) => {
  try {
    const token = extractToken(req);
    if (!token) {
      no_token_response(res);
    }

    const data =req.body;
    const result = await create_request(token,data,budget,"Budget");
     response(res, result);
  } catch (err) {
    internal_Server_Response(res, err);
  }
};

const budget_update = async (req, res) => {
  try {
    const token = extractToken(req);
    if (!token) {
      no_token_response(res);
    }

    const uid =req.params.id;
    const data =req.body;
    const result = await update_request(token,uid,data,budget,"Budget") 
    response(res,result)

  } catch (err) {
    internal_Server_Response(res, err);
  }
};

const budget_soft_delete = async (req, res) => {
  try {
    const token = extractToken(req);
    if (!token) {
      no_token_response(res);
    }

    const uid =req.params.id;
    const result =await softDelete_request(token,uid,budget,"Budget")
    response(res,result)
  } catch (err) {
    internal_Server_Response(res, err);
  }
};

const budget_hard_delete = async (req, res) => {
  try {
    const uid=req.params.id;
    const result= await hardDelete_request(uid,budget,"Budget")
    response(res,result)
  } catch (err) {
    internal_Server_Response(res, err);
  }
};

module.exports = {
  budget_list,
  budget_update,
  budget_create,
  budget_soft_delete,
  budget_hard_delete,
};
