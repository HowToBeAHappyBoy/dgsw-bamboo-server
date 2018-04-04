const jwt=require('jsonwebtoken');
const{
    secret
}=require('../config.json');
const certFunc=async (req,res,next)=>{
    const token=req.headers['authorization'];
    if(!token){
        const result={
            "status":401,
            "code":0,
            "desc":"token is not exist"
        }
        return res.status(401).json(result).end();
    }
    const check = new Promise(
        (resolve, reject) => {
            jwt.verify(token, secret, (err, decoded) => {
                if (err) reject(err)
                resolve(decoded)
            })
        }
    )

    const onError = (error) => {
        const result={
            "status":403,
            "code":0,
            "desc":"error",
            "error":error.message
        };
        res.status(403).json(result);
    }

    check.then((decoded) => {
        next()
    }).catch(onError);
}

module.exports=certFunc;