const mongoose=require('mongoose');
const hostelScema=new mongoose.Schema({
    
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    HostalName:{
        type:String,
        required:true
    },
    mobile :{
        type:String,
        required:true
    },
    rate :{
        type:String,
        required:true
    },
    distance:{
        type:String,
        required:true
    },
    rooms:{
        type:String,
        required:true
    },
    img:{
        type:String,
        default:""
    },
    password : {
        type:String,
        required:true
    },


    })
    const hostel=mongoose.model('hostel',hostelScema);
    module.exports=hostel;