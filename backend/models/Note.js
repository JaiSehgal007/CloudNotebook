// note that the name of the file is starting with "N" this is capital as it is a model
const mongoose = require('mongoose');

const NotesSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    title:{
        type:String,
        required: true
    },
    description:{
        type:String,
        required:true,
    },
    tag:{
        type:String,
        default:"General"
    },
    date:{
        type:Date,
        default:Date.now
    },
});

module.exports=mongoose.model('note',NotesSchema); 