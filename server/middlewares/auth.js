const mongoose=require('mongoose');
const admin=require('../database/model/admin');
const authFunc=async (req,res,next)=>{
    const token=req.body.token||req.query.token;
    if(!token){
        return res.status(401).end();
    }

    try{
        const auth=await admin.find({
            "token":token
        });
        if(auth==null){
            return res.sendStatus(204);
        }
        next();
    }catch(error){
        res.status(500);
    }
}

module.exports=authFunc;