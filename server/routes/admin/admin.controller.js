const aPost=require('../../database/model/After_post')
const bPost=require('../../database/model/Before_post')

lastId= async ()=>{
    try{
        let id=await aPost.findOne().sort({
            "idx":1
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
        if(post==null){
            return res.sendStatus(204);
        }
        console.log(post);
    }catch(error){
        console.log(error);
        res.sendstatus(500);
    }
}

exports.hello=(req,res)=>{
    const id=req.params.id;
    console.log(id);
    res.send('hello');
}
exports.phello=(req,res)=>{
    const id=req.body.id||req.query.id;
    console.log(id);
    res,send('hello');
}