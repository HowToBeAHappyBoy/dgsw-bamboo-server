const aPost=require('../../database/model/After_post')
const bPost=require('../../database/model/Before_post')
lastId= async ()=>{
    try{
        let id=await bPost.find().sort({
            "idx":-1
        });
        console.log('잉');
        return id;
    }catch(error){
        
        return 0;
    }
}
exports.readPost=async (req,res)=>{
    let id=req.params.id;
    try{
        const post=await aPost.find().sort({ "idx":-1 }).limit(5).skip(id);
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
    const idx=lastId();
    const desc=req.params.desc;
    const writeDate=new Date();
    const isAllow=false;
    try{
        const post=await bPost.create({
            idx,
            desc,
            writeDate,
            isAllow
        });

        return res.sendStatus(201);
    }catch(error){
        console.log(error);
        return res.sendStatus(500);
    }
}