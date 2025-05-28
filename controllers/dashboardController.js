

const dashboard_get =async (req,res)=>{
    try{
        res.send("success full")

    }catch(err){
        res.status(500).json({code:500,message:"Internal Server Error",error:err?.message})
    }
}


module.exports={dashboard_get}