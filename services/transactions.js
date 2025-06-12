const transactions =require("../models/transactions");
const jwt = require('jsonwebtoken');


const verifyToken = (token) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Make sure to set JWT_SECRET in your env
        return { success: true, decoded };
    } catch (err) {
        return { success: false, error: err.message };
    }
};

const list_request = async (token, filters = {}) => {
    try {
        // Verify JWT token
        const tokenVerification = verifyToken(token);
        if (!tokenVerification.success) {
            return {
                success: false,
                status: 401,
                message: "Invalid or expired token"
            };
        }

        // Extract user info from token
        const userId = tokenVerification.decoded.userId; // Adjust based on your token structure

        // Build query object
        let query = { is_deleted: { $ne: true } }; // Exclude soft deleted records
        
        // Add user-specific filter if needed
        if (tokenVerification.decoded.role !== 'admin') {
            query.userId = userId; // Only show user's own transactions
        }

        // Add additional filters if provided
        if (filters.status) query.status = filters.status;
        if (filters.dateFrom) query.createdAt = { $gte: new Date(filters.dateFrom) };
        if (filters.dateTo) {
            query.createdAt = query.createdAt || {};
            query.createdAt.$lte = new Date(filters.dateTo);
        }

        // Fetch transactions
        const transactions = await transaction.find(query)
            .sort({ createdAt: -1 }) // Sort by newest first
            .select('-__v'); // Exclude version field

        return {
            success: true,
            status: 200,
            message: "Transactions retrieved successfully",
            data: transactions,
            count: transactions.length
        };

    } catch (err) {
        return {
            success: false,
            status: 500,
            message: "Internal server error",
            error: err.message
        };
    }
};


const create_request =async(data)=>{
    try{

        const new_request =await transactions.create(data);
        return{
            success:true,
            status:200,
            message:"transactions Created Successfully",
        }

    }catch(err){
        return err;
    }
}


const update_request = async (uid,data) =>{
    try{

        const existing_data = await transactions.findOne({uid:uid})
        if(existing_data){
            await transactions.updateOne(data);
            return{
                success:true,
                statue:200,
                message:"Updated Successfully"
            }

        }else{
            return{
                success:false,
                status:400,
                message:"Uid is not found"
            }
        }

    }catch (err){
        return err;
    }
}


const soft_delete =async (uid)=>{
    try{
        const existing_data = await transactions.findOne({uid:uid})

        if(existing_data){
            const data={
                is_deleted:true,
            }
            await transactions.updateOne(data);
            return{
                success:true,
                status:200,
                message:"Deleted successfully"
            }

        }else{
            return{
                sucess:false,
                status:400,
                message:"Uid is not found"
            }
        }

    }catch (err){
        return err;
    }
}


const hard_delete = async (uid)=>{
    try{
        const existing_data = await transactions.findOne({uid:uid})

        if(existing_data){
            await transactions.deleteOne(existing_data)
             return{
                success:true,
                status:200,
                message:"Deleted successfully"
            }
        }else{
            return{
                success:false,
                statue:400,
                message:"Uid is not found"
            }
        }

    }catch(err){
        return err;
    }
}

module.exports={
    list_request,
    create_request,
    update_request,
    soft_delete,
    hard_delete
}