const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const transactions_schema = new mongoose.Schema({
  uid: { type: String, default: uuidv4, unique: true },
  date: { type: Date, required: true },
  type: { type: String, enum: ["expense", "income"], required: true },
  category: { type: String, required: true },
  amount: { type: Number, required: true },
  created_at: { type: Date, default: Date.now },
  created_by: { type: Number, default: 1 },
  is_deleted: { type: Boolean, default: false },
});



module.exports=mongoose.model('transactions',transactions_schema)