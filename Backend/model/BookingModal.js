const mongoose=require('mongoose');
const hostel = require('./Hostelmodel');
const BookinSchema=new mongoose.Schema({
    
 
    hostelId:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        required:true
    
    },
    user:{
        type:Object,
        required:true
    },
    hostel:{
        type:Object,
        required:true
    },
    joiningDate:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },

    })
    const Booking=mongoose.model('BookinSchema',BookinSchema);
        module.exports=Booking;