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

exports.getPost=async () =>{
    
}