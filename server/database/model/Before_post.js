const mongoose=require('mongoose');
const Schema=mongoose.Schema;

let BeforePost=Schema({
    "idx":{type:Number,require:true,unique:true},
    "desc":{type:String, require:true, unique:false},
    "writeDate":{type:Date,require:true,default:Date.now},
    "isAllow":{type:Boolean,require:true,default:false}
},{
    collection:"BeforePost"
});
module.exports=mongoose.model('bPost',BeforePost);