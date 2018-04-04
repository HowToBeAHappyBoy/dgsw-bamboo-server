const mongoose=require('mongoose');
const admin=require('../database/model/admin');
const authFunc=async (req,res,next)=>{
    const token=req.headers['authorization'];
    if(!token){
        return res.status(401).end();
    }
    try{
        const auth=await admin.find({
            "token":token
        });
        if(auth==false){
            const result={
                "status":403,
                "code":0,
                "desc":"not auth"
            }
            return res.status(403).json(result);
        }
        next();
    }catch(error){
        const result={
            "status":500,
            "code":0,
            "desc":"서지녁에게 문의하세요"
        }
        res.status(500).json(result);
    }
}

module.exports=authFunc;