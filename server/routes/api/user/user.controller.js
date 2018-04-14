const aPost=require('../../../database/model/After_post')
const bPost=require('../../../database/model/Before_post')

exports.count=async (req,res)=>{
    try{
        let count=await aPost.find().sort({ "idx":-1 }).limit(1);
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
            "count":count[0].idx,
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
exports.readPost=async (req,res)=>{
    const id=parseInt(req.params.id);
    try{
        let post=await aPost.find().sort({ "idx":-1 }).limit(5).skip(id);
        if(post==false){
            const result={
                "status":204,
                "code":0,
                "desc":"result not found"
            };
            return res.status(204).json(result);
        }
        let posted=new Array(post.length);
        for(let i=0;i<post.length;i++){
            //데이트 포맷 바꿈 다른 방법 있어요 이거?
            let writeDate=post[i].writeDate.toLocaleString();
            let allowDate=post[i].allowDate.toLocaleString();
            //아무리 해도 접근이 안 돼서 걍 배열 새로 만듦
            posted[i]={
                "idx":post[i].idx,
                "desc":post[i].desc,
                "writeDate":writeDate,
                "allowDate":allowDate,
                "isAllow":post[i].isAllow
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
            "error":error
        };
        console.log(error);
        res.status(500).json(result);
    }
}

exports.sendPost=async (req,res)=>{
    try{
        let idx=await bPost.find().sort({ "idx":-1 }).limit(1);
        if(idx==false){
            idx=1;
        }else{
            idx=idx[0].idx+1;
        }
        const desc=req.body.desc;
        const category=req.body.category;
        const isChange=false;
        const post=await bPost.create({
            idx,
            desc,
            category,
            isChange
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