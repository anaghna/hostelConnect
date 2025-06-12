const mongoose=require('mongoose');
const OwnerScema=new mongoose.Schema({
    
    hostelname:{
        type:String,
        required:true
    },


    username:{
        type:String,
        required:true
    },
    emailid:{
        type:String,
        required:true
    
    },
    password:{
        type:String,
        required:true
    }

    })
    const owner=mongoose.model('owner',OwnerScema);
        module.exports=owner;