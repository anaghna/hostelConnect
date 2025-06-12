const mongoose=require('mongoose');
const UserScema=new mongoose.Schema({
    
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    
    },
    password:{
        type:String,
        required:true
    }

    })
    const user=mongoose.model('user',UserScema);
        module.exports=user;