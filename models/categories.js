const mongoose =require('mongoose');
const {v4:uuidv4} =require ("uuid");



const category_schema =new mongoose.Schema({
    uid:{type:String, default:uuidv4 ,unique:true},
    category_name:{type:String,required:true , trim: true},
    category_image:{type:String,required:false,trim:true},
    is_deleted:{type:Boolean ,defalut:false},
    created_at: { type: Date, default: Date.now },
    created_by: { type: String,  },
    updated_by: { type: String,  },
    updated_at:{ type: Date, default: Date.now }
})




module.exports =mongoose.model('categories',category_schema)