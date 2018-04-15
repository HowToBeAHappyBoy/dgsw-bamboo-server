const aPost=require('../../../database/model/After_post')
const bPost=require('../../../database/model/Before_post')
const rPost=require('../../../database/model/Reject_post')
const fb=require('fb');
const {
    accessToken
}=require('../../../config.json');
fb.setAccessToken(accessToken);

exports.count=async (req,res)=>{
    try{
        let count=await bPost.find({
            "isChange":false
        }).count();
        console.log(count);
        if(count==false){
            const result={
                "status":204,
                "code":0,
                "desc":"result not found"
            };
            return res.status(204).json(result);
        }
        const result={
            "status":200,
            "code":0,
            "count":count,
            "desc":"successful count"
        };
        return res.status(200).json(result);
    }catch(error){
        console.log(error);
        const result={
            "status":500,
            "code":0,
            "desc":"unknown error 서지녁에게 문의할 것",
            "error":error
        };
        console.log(error);
        res.status(500).json(result);
    }
}

exports.readPost=async (req,res) =>{
    const id=parseInt(req.params.id);
    try{
        let post=await bPost.find({
            "isChange":false
        }).sort({ "idx":1 }).limit(5).skip(id);
        if(post==false){
            const result={
                "status":204,
                "code":0,
                "desc":"result not found"
            };
        }
        let posted=new Array(post.length);
        for(let i=0;i<post.length;i++){
            let writeDate=post[i].writeDate.toLocaleString();
            posted[i]={
                "idx":post[i].idx,
                "desc":post[i].desc,
                "writeDate":writeDate,
                "isChange":post[i].isChange
            }
        }
        const result={
            "status":200,
            "code":1,
            posted,
            "desc":"successful request"
        };
        res.status(200).json(result);
    }catch(error){
        const result={
            "status":500,
            "code":0,
            "desc":"unknown error 서지녁에게 문의할 것",
            "error":error.message
        };
        res.status(500).json(result);
    }
}

exports.allow=async (req,res)=>{
    const id=req.body.id;
    const admin=req.body.admin;
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
        if(post[0].isChange===true){
            const result={
                "status":232,
                "code":0,
                "desc":"result not found"
            };
            return res.status(232).json(result);
        }
        let idx=await aPost.find({}).sort({ "idx":-1 }).limit(1);
        if(idx==false){
            idx=1;
        }else{
            idx=idx[0].idx+1;
        }
        const desc=post[0].desc;
        const writeDate=post[0].writeDate;
        const allowed=await aPost.create({
            idx,
            desc,
            writeDate,
            admin
        });
        const update=await bPost.update({"idx":id},{$set:{"isChange":true}});
        let docs='#대소고_'+idx+'번째_이야기 \n'+writeDate.toLocaleString()+'\n\n'+desc;
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
            "error":error.message
        };
        console.log(error.message);
        res.status(500).json(result);
    }
}

exports.reject=async (req,res)=>{
    const idx=req.body.id;
    const admin=req.body.admin;
    try{
        const post=await bPost.find({
            "idx":idx
        });
        if(post==false){
            const result={
                "status":204,
                "code":0,
                "desc":"result not found"
            };
            return res.status(204).json(result);
        }
        if(post[0].isChange===true){
            const result={
                "status":232,
                "code":0,
                "desc":"result not found"
            };
            return res.status(232).json(result);
        }
        const desc=post[0].desc;
        const rejected=await rPost.create({
            idx,
            desc,
            admin
        });
        const update=await bPost.update({"idx":idx},{$set:{"isChange":true}});
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
            "error":error.message
        };
        console.log(error.message);
        res.status(500).json(result);
    }
}
