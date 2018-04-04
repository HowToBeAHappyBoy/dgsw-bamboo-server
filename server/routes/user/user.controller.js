const aPost=require('../../database/model/After_post')
const bPost=require('../../database/model/Before_post')

exports.readPost=async (req,res)=>{
    try{
        const post=await aPost.find().sort({ "idx":-1 });
        if(post==false){
            return res.sendStatus(204);
        }

        res.status(200).json(post);
    }catch(error){
        console.log(error);
        res.sendStatus(500);
    }
}

exports.sendPost=async (req,res)=>{
    try{
        let id=await bPost.find().sort({ "idx":-1 }).limit(1);
        const idx=id[0].idx+1;
        const desc=req.body.desc;
        const writedDate=new Date().toLocaleString();
        const isAllow=false;
        const post=await bPost.create({
            idx,
            desc,
            writedDate,
            isAllow
        });
        return res.sendStatus(201);
    }catch(error){
        console.log(error);
        return res.sendStatus(500);
    }
}