const aPost=require('../../../database/model/After_post')
const bPost=require('../../../database/model/Before_post')

exports.readPost=async (req,res)=>{
    const id=parseInt(req.params.id);
    try{
        const post=await aPost.find().sort({ "idx":-1 }).limit(5).skip(id);
        if(post==false){
            const result={
                "status":204,
                "code":0,
                "desc":"result not found"
            };
            return res.status(204).json(result);
        }

        const result={
            "status":200,
            "code":1,
            "data":post,
            "desc":"successful request"
        };
        res.status(200).json(result);
    }catch(error){
        const result={
            "status":500,
            "code":0,
            "desc":"unknown error 서지녁에게 문의할 것",
            "error":error
        };
        res.status(500).json(result);
    }
}

exports.sendPost=async (req,res)=>{
    try{
        let id=await bPost.find().sort({ "idx":-1 }).limit(1);
        const idx=id[0].idx+1;
        const desc=req.body.desc;
        const isAllow=false;
        const post=await bPost.create({
            idx,
            desc,
            isAllow
        });
        const result={
            "status":201,
            "code":1,
            "desc":"successful request"
        }
        return res.status(201).json(result);
    }catch(error){
        const result={
            "status":500,
            "code":0,
            "desc":"unknown error 서지녁에게 문의할 것",
            "error":error
        };
        res.status(500).json(result);
    }
}