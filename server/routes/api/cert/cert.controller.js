const Admin = require('../../../database/model/admin');
const {
    secret
}=require('../../../config.json');

exports.signup= async (req,res)=>{
    const id=req.body.id;
    const pw=req.body.pw;
    const name=req.body.name;
    try{
        const admin=await Admin.findById(id);
        if(admin!==null){
            const result={
                "status":409,
                "code":0,
                "desc":"이미 존재하는 어드민"
            }
            return res.status(409).json(result);
        }
        const signupedAdmin=await Admin.signup(id,pw,name);
        const token=await signupedAdmin.urgentToken();
        const result={
            "status":201,
            "code":1,
            "desc":"successful signup",
            "token":token
        }
        return res.status(201).json(result);
    }catch(error){
        console.log(error);
        const result={
            "status":500,
            "code":0,
            "desc":"unknown error",
            "error":error
        }
        return res.status(500).json(result);
    }
}
exports.signin = async (req, res) => {
    const id=req.body.id;
    const pw=req.body.pw;

    try {
        const admin = await Admin.findById(id);
        if (admin.checkPassword(pw)) {
            const token=await admin.urgentToken();
            const result={
                "status":200,
                "code":1,
                "desc":"successful login",
                "token":token
            }
            return res.status(200).json(result);
        } else {
            const result={
                "status":401,
                "code":0,
                "desc":"login failed"
            }
            return res.status(401).json(result);
        }
    } catch (error) {
        const result={
            "status":500,
            "code":0,
            "desc":"error"
        }
        console.log(error);
        return res.status(500).json(result);
    }
}
