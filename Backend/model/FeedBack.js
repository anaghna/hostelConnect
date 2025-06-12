const mongoose=require('mongoose');
const FeedBack=new mongoose.Schema({
    feedback:{
        type:String,
        required:true
    },
    hosteId:{
        type:String,
        required:true
    },
    user:{
        type:Object,
        required:true
    }
    })
    const feedBackModel=mongoose.model('FeedBack',FeedBack);
    module.exports=feedBackModel;