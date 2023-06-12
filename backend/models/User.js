const mongoose = require('mongoose');
const {Schema}=mongoose;

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required:true,
        unique: true
    },
    password:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
        // now note that we are not giving the parenthesis after now as we want it to 
        // run only when a document is getting inserted in mongo
    },
});
const User=mongoose.model('user',UserSchema); 
// User.createIndexes(); this was initially used to make unique entries, but not it is itself fixed inside auth.js
module.exports=User;