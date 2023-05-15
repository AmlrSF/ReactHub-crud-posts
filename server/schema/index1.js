const mongoose = require('mongoose');

const postsSchema = new mongoose.Schema({
    author:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:false
    },
    date :{
        type:String,
        required:false
    }
  });

module.exports = mongoose.model('post',postsSchema);