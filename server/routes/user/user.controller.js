const aPost=require('../../database/model/After_post')
const bPost=require('../../database/model/Before_post')
lastId= async ()=>{
    try{
        let id=await Post.findOne().sort({
            "idx":-1
        });
        console.log(id);
        let result={
            code:1,
            id:id
        };
        return result;
    }catch(error){
        console.log(error);
        let result={
            code:0,
            desc:error
        }
        return result;
    }
}
exports.getPost=async (req,res)=>{
    let id=req.params.id;
    try{
        const post=aPost.find().sort({ "idx":-1 }).limit(5).skip(id);
        if(post==null){
            return res.sendStatus(204);
        }

        res.status(200).json(post);
    }catch(error){
        console.log(error);
        res.sendStatus(500);
    }
}

exports.sendPost=async (req,res)=>{
    const idx=lastId().id+1;
    const desc=req.body.id||req.query.id;
    const writeDate=null;
    const isAllow=null;
    try{
        const post=bPost.create({
            idx,
            desc,
            writeDate,
            isAllow
        });

        return sendStatus(201);
    }catch(error){
        console.log(error);
        return res.sendStatus(500);
    }
}