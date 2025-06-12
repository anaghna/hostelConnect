const mongoose=require('mongoose');
const favScema=new mongoose.Schema({
    
    user:{
        type:String,
        required:true
    },
    hostelId:{
    type:Array,
    required:true
   }
    })
    const fav=mongoose.model('fav',favScema);
    module.exports=fav;