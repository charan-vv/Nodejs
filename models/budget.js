const mongoose = require('mongoose')
const {v4:uuidv4} =require ("uuid");


const budget_schema = new mongoose.Schema({

    uid:{type:String,default:uuidv4 ,unique:true},
    category:{type:String ,required :true , trim: true},
    amount:{type:Number,required:true , trim: true},
    is_deleted:{type:Boolean ,defalut:false},
    created_at: { type: Date, default: Date.now },
    created_by: { type: String },
    updated_by: { type: String,  },
    updated_at:{ type: Date, default: Date.now }
})

module.exports =mongoose.model('budget',budget_schema)