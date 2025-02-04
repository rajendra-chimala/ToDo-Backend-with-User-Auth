const mongoose = require('mongoose');


const todoSchema = new mongoose.Schema({
    title:{type:String,required:true},
    description:{type:String,required:true},
    createdAt:{type:Date,default:Date.now},
    createdBy:{type:mongoose.Schema.Types.ObjectId},
})


const Todo = mongoose.model("Todo",todoSchema);

module.exports = Todo;