const mongoose=require('mongoose');
const Schema=mongoose.Schema;

let AfterPost=Schema({
    "idx":{type:Number,require:true,unique:true},
    "desc":{type:String, require:true, unique:false},
    "writeDate":{type:Date,require:true,default:new Date},
    "allowDate":{type:Date,require:true,default:new Date},
    "admin":{type:String,require:true}
},{
    collection:"AfterPost"
});
module.exports=mongoose.model('aPost',AfterPost);