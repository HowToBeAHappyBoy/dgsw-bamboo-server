const mongoose=require('mongoose');
const Schema=mongoose.Schema;

let Admin=Schema({
    "id":{type:String,require:true,unique:false},
    "password":{type:String,require:true,unique:false},
    "token":{type:String,require:true,unique:false}
},{
    collection:"admin"
});

module.exports=mongoose.model('admin',Admin);