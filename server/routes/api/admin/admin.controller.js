const aPost=require('../../../database/model/After_post')
const bPost=require('../../../database/model/Before_post')
const fb=require('fb');
const {
    accessToken
}=require('../../../config.json');
fb.setAccessToken(accessToken);


exports.readPost=async (req,res) =>{
    const id=parseInt(req.params.id);
    try{
        const post=await bPost.find({
            "isAllow":false
        }).sort({ "idx":-1 }).limit(5).skip(id);
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

exports.allow=async (req,res)=>{
    const id=req.params.id;
    try{
        const post=await bPost.find({
            "idx":id
        });
        if(post==false){
            const result={
                "status":204,
                "code":0,
                "desc":"result not found"
            };
            return res.status(204).json(result);
        }
        let idx=await aPost.find({}).sort({ "idx":-1 }).limit(1); idx=idx[0].idx+1;
        const desc=post[0].desc;
        const writeDate=post[0].writeDate;
        const allowed=await aPost.create({
            idx,
            desc,
            writeDate
        });
        const update=await bPost.update({"idx":id},{$set:{"isAllow":true}});
        let docs='#대소고_'+idx+'번째_이야기 \n\n\n'+desc;
        fb.api('/feed', 'post', { message:docs }, function (res) {
            if(!res || res.error) {
            console.log(!res ? 'error occurred' : res.error);
            const result={
                "status":408,
                "code":0,
                "desc":"facebook API error",
                "error":error
            };
            return res.status(408).json(result);
            }
            console.log('Post Id: ' + res.id);
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

exports.reject=async (req,res)=>{
    const id=req.body.id;
    try{
        const update=await bPost.update({"idx":id},{$set:{"isAllow":true}});
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
