const mongoose=require('mongoose');
const Schema=mongoose.Schema;

let AfterPost=Schema({
    "idx":{type:Number,require:true,unique:true},
    "desc":{type:String, require:true, unique:false},
    "writeDate":{type:Date,require:true,default:Date.now},
    "allowDate":{type:Date,require:true,default:Date.now}
},{
    collection:"AfterPost"
});
module.exports=mongoose.model('aPost',AfterPost);