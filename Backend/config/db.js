const mongoose =require('mongoose');

const db=()=>{
     return mongoose.connect('mongodb+srv://user:123@cluster0.nihvm.mongodb.net/HCNew?retryWrites=true&w=majority&appName=Cluster0')
}
module.exports=db;