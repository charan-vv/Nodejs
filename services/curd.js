const { user_detail } = require("../helpers/userDetails");

const list_request = async (token, filters = {}, table, name) => {
  try {
    const user = user_detail(token);
    let query = { is_deleted: { $ne: true } };
    if (user.role !== "admin") {
      query.created_by = user?.uid;
    }
    const result = await table
      .find(query)
      .sort({ created_at: -1 })
      .select("-__v");
    return {
      success: true,
      status: 200,
      message: `${name} retrieved successfully`,
      data: result,
      total: result.length,
    };
  } catch (err) {
    return err;
  }
};

const create_request = async (token, data, table, name) => {
  try {
    const user = user_detail(token);
    
    const request = {
      ...data,
      created_by: user?.uid,
    };
    console.log(request,"-------------",data)
    await table.create(request);
    return {
      success: true,
      status: 200,
      message: `${name} Created Successfully`,
    };
  } catch (err) {
    return err;
  }
};

const update_request = async (token, uid, data, table, name) => {
  try {
    const existing_data = await table.findOne({ uid: uid });
    if (existing_data) {
      const user = user_detail(token);

      data.updated_by = user?.uid;
      data.updated_at = Date.now();
      await table.updateOne({uid:uid},{$set:data});
      return {
        success: true,
        status: 200,
        message: `${name} is updated successfully`,
      };
    } else {
      return {
        success: false,
        status: 400,
        message: `${name} is not found Update`,
      };
    }
  } catch (err) {
    return err;
  }
};

const softDelete_request = async (token, uid, table, name) => {
  try {
    const existing_data = await table.findOne({ uid: uid });
    if (existing_data) {
      const user = user_detail(token);
      const data = {
        is_deleted: true,
        updated_by: user.uid,
      };
       await table.updateOne({uid:uid},{$set:data});
      return {
        success: true,
        status: 200,
        message: "Deleted successfully",
      };
    } else {
      return {
        success: false,
        status: 400,
        message: `${name} is not found to Delete`,
      };
    }
  } catch (err) {
    return err;
  }
};

const hardDelete_request = async (uid, table, name) => {
  try {
    const existing_data = await table.findOne({ uid: uid });
    if (existing_data) {
     await table.deleteOne({ uid: uid });
      return {
        success: true,
        status: 200,
        message: "Deleted successfully",
      };
    } else {
      return {
        success: false,
        status: 400,
        message: `${name} is not found to Delete`,
      };
    }
  } catch (err) {
    return err;
  }
};


const view_details_request =async (uid,table,name)=>{
  try{
    const existing_data = await table.findOne({uid:uid})
    if(existing_data){
      return {
        success: true,
        status: 200,
        data:existing_data,
        message: `${name} is retrevied successfully`,
      };

    }else{
      return {
        success: false,
        status: 400,
        message: `${name} is not found `,
      };
    }

  }catch (err){
    return err
  }
}

module.exports = {
  list_request,
  create_request,
  update_request,
  softDelete_request,
  hardDelete_request,
  view_details_request,
};
