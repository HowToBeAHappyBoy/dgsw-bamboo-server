const mongoose=require('mongoose');
const Schema=mongoose.Schema;

let RejectPost=Schema({
    "idx":{type:String,require:true,unique:false},
    "desc":{type:String, require:true, unique:false},
    "admin":{type:String,require:true}
},{
    collection:"RejectPost"
});
module.exports=mongoose.model('rPost',RejectPost);