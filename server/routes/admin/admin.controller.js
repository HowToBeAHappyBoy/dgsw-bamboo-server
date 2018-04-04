const aPost=require('../../database/model/After_post')
const bPost=require('../../database/model/Before_post')


exports.readPost=async (req,res) =>{
    try{
        const post=await bPost.find({
            "isAllow":false
        })
        if(post==null){
            return res.sendStatus(204);
        }

        res.status(200).json(post);
    }catch(error){
        console.log(error);
        res.sendstatus(500);
    }
}

exports.allow=async (req,res)=>{
    const id=req.params.id;
    try{
        const post=await bPost.find({
            "idx":id
        });
        if(post==false){
            return res.sendStatus(204);
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
        return res.sendStatus(201);
    }catch(error){
        console.log(error);
        return res.sendstatus(500);
    }
}

exports.reject=async (req,res)=>{
    const id=req.params.id;
}
