const mongoose=require('mongoose');
const ServiceScema=new mongoose.Schema({
    
 
    Location:{
        type:String,
        required:true
    },
    distance:{
        type:String,
        required:true
    
    },
    messID:{
        type:String,
        required:true
    }

    })
    const service=mongoose.model('ser',ServiceScema);
        module.exports=service;