const mongoose=require('mongoose');
const messservice=new mongoose.Schema({
    
    name:{
        type:String,
        required:true
    },
    phoneno:{
        type:String,
        required:true
    },
    emailid:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
 
    distance:{
        type:String,
        required:true
    },
   
    password:{
        type:String,
        required:true
    },
    })
    const mess=mongoose.model('mess',messservice);
    module.exports=mess;