const categories = require("../models/categories");
const {
  list_request,
  create_request,
  update_request,
  softDelete_request,
  hardDelete_request,
} = require("../services/curd");
const { internal_Server_Response, response } = require("../helpers/response");
const { extractToken } = require("../helpers/userDetails");




const list = async (req, res) => {
  try {
    const token = extractToken(req);
    if (!token) {
      no_token_response(res);
    }
    const filters={}
    const result =await list_request(token,filters,categories,"Categories")
    response(res,result)
  } catch (err) {
    internal_Server_Response(res, err);
  }
};



const create = async (req, res) => {
  try {
    const token = extractToken(req);
    if (!token) {
      no_token_response(res);
    }
    const data = req.body;
    const result = await create_request(token,data, categories,"Category");
    response(res,result)
  } catch (err) {
    internal_Server_Response(res, err);
  }
};


const update = async (req, res) => {
  try {
    const token = extractToken(req);
    if (!token) {
      no_token_response(res);
    }
    const uid=req.params.id;
    const data=req.body;
    const result =await update_request(token,uid,data,categories,"Category")
    response(res,result)
  } catch (err) {
    internal_Server_Response(res, err);
  }
};


const soft_delete = async (req, res) => {
  try {
    const token = extractToken(req);
    if (!token) {
      no_token_response(res);
    }
    const uid =req.params.id;
    const result = await softDelete_request(token,uid,categories,"Category")
    response(res,result)
  } catch (err) {
    internal_Server_Response(res, err);
  }
};


const hard_delete = async (req, res) => {
  try {
     const uid =req.params.id;
    const result = await hardDelete_request(uid,categories,"Category")
    response(res,result)
  } catch (err) {
    internal_Server_Response(res, err);
  }
};



module.exports = {
  list,
  create,
  update,
  soft_delete,
  hard_delete,
};
